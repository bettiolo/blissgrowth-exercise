import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ConnectionsController } from '../src/connections/connections.controller'
import { ConnectionsService } from '../src/connections/connections.service'
import { XataService } from '../libs/xata.service'

describe('/connections (POST)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [ConnectionsService, XataService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('401 Unauthorized with invalid API key', () => {
    return request(app.getHttpServer()) //
      .post('/connections')
      .expect(401)
      .expect({ statusCode: 401, message: 'Header invalid: x-api-key', error: 'Unauthorized' })
  })

  it('400 Bad Request when `provider` not specified', () => {
    return request(app.getHttpServer()) //
      .post('/connections')
      .set('x-api-key', 'valid-api-key-1')
      .send({ token: '123' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['provider must be one of the following values: github', 'provider should not be empty'],
        error: 'Bad Request',
      })
  })

  it('400 Bad Request when `provider` invalid', () => {
    return request(app.getHttpServer()) //
      .post('/connections')
      .set('x-api-key', 'valid-api-key-1')
      .send({ provider: 'bad-provider', token: '123' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['provider must be one of the following values: github'],
        error: 'Bad Request',
      })
  })

  it('400 Bad Request when `token` not specified', () => {
    return request(app.getHttpServer())
      .post('/connections')
      .set('x-api-key', 'valid-api-key-1')
      .send({ provider: 'github' })
      .expect(400)
      .expect({ statusCode: 400, message: ['token should not be empty'], error: 'Bad Request' })
  })

  it('201 Created with connection id', () => {
    return request(app.getHttpServer())
      .post('/connections')
      .set('x-api-key', 'valid-api-key-1')
      .send({ provider: 'github', token: '123' })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toMatch(/^rec_/)
      })
  })
})
