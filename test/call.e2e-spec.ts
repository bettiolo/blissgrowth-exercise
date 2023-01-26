/// <reference types="jest-extended" />
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { CallController } from '../src/call/call.controller'
import { XataService } from '../libs/xata.service'
import { HttpModule } from '@nestjs/axios'

describe('/call (GET)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CallController],
      providers: [XataService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('401 Unauthorized with invalid API key', () => {
    return request(app.getHttpServer())
      .get('/call/bad-connection-id/GET/github/user') //
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Header invalid: x-api-key', //
        error: 'Unauthorized',
      })
  })

  // TODO: Test missing parameters, omitted for brevity for the scope of the exercise

  it('400 Bad Request when `connectionId` invalid', () => {
    return request(app.getHttpServer())
      .get('/call/bad-connection-id/GET/github/user')
      .set('x-api-key', 'valid-api-key-1')
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['connectionId must match /^rec_/ regular expression'], //
        error: 'Bad Request',
      })
  })

  it('400 Bad Request when `method` invalid', () => {
    const testConnectionId = 'rec_cf4tv9hdd0ahtce9uvkg'
    return request(app.getHttpServer())
      .get(`/call/${testConnectionId}/LOL/github/user`)
      .set('x-api-key', 'valid-api-key-1')
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['method must be one of the following values: GET'], //
        error: 'Bad Request',
      })
  })

  it('400 Bad Request when `provider` invalid', () => {
    const testConnectionId = 'rec_cf4tv9hdd0ahtce9uvkg'
    return request(app.getHttpServer())
      .get(`/call/${testConnectionId}/GET/invalid-provider/user`)
      .set('x-api-key', 'valid-api-key-1')
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['provider must be one of the following values: github'], //
        error: 'Bad Request',
      })
  })

  it('400 Bad Request when `path` invalid', () => {
    const testConnectionId = 'rec_cf4tv9hdd0ahtce9uvkg'
    return request(app.getHttpServer())
      .get(`/call/${testConnectionId}/GET/github/#?invalid/`) // Missing path
      .set('x-api-key', 'valid-api-key-1')
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['path must match /^(?!\\/)[^?\\n]+/ regular expression'], //
        error: 'Bad Request',
      })
  })

  it('200 OK for github ~/user', () => {
    const validConnectionId = process.env.TEST_VALID_CONNECTION_ID_GITHUB
    if (!validConnectionId) throw new Error('TEST_VALID_CONNECTION_ID env variable not set')

    return request(app.getHttpServer())
      .get(`/call/${validConnectionId}/GET/github/user`)
      .set('x-api-key', 'valid-api-key-1')
      .expect(200)
      .expect((res) => {
        expect(res.body.providerStatusCode).toBe(200)

        // We are checking that the shape of the response is correct as the data is user specific
        expect(res.body.providerData.type).toBe('User')
        expect(res.body.providerData.id).toBeNumber()
        expect(res.body.providerData.login).not.toBeEmpty()
        expect(res.body.providerData.login).toBeString()
        expect(res.body.providerData.email).not.toBeEmpty()
        expect(res.body.providerData.email).toBeString()
        expect(res.body.providerData.url).not.toBeEmpty()
        expect(res.body.providerData.url).toBeString()
      })
  })

  it('200 OK for github ~/user/followers', () => {
    const validConnectionId = process.env.TEST_VALID_CONNECTION_ID_GITHUB
    if (!validConnectionId) throw new Error('TEST_VALID_CONNECTION_ID env variable not set')

    return request(app.getHttpServer())
      .get(`/call/${validConnectionId}/GET/github/user/followers`)
      .set('x-api-key', 'valid-api-key-1')
      .expect(200)
      .expect((res) => {
        expect(res.body.providerStatusCode).toBe(200)

        // We are checking that the shape of the response is correct as the data is user specific
        expect(res.body.providerData).toBeArray()
        const follower1 = res.body.providerData[0]
        expect(follower1.type).toBe('User')
      })
  })
})
