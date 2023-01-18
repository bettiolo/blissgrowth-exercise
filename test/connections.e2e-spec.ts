import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ConnectionsModule } from '../src/connections/connections.module'

describe('/connections (POST)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConnectionsModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  }) //   ^?

  it('401 Unauthorized with invalid API key', () => {
    return request(app.getHttpServer()) //
      .post('/connections')
      .expect(401)
      .expect({ statusCode: 401, message: 'Header invalid: x-api-key', error: 'Unauthorized' })
  })

  it('400 Bad Request when type not specified', () => {
    return request(app.getHttpServer()) //
      .post('/connections')
      .set('x-api-key', 'valid-api-key-1')
      .send({ token: '123' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['type must be one of the following values: github', 'type should not be empty'],
        error: 'Bad Request',
      })
  })

  it('400 Bad Request when type invalid', () => {
    return request(app.getHttpServer()) //
      .post('/connections')
      .set('x-api-key', 'valid-api-key-1')
      .send({ type: 'bad-type', token: '123' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['type must be one of the following values: github'],
        error: 'Bad Request',
      })
  })

  it('400 Bad Request when token not specified', () => {
    return request(app.getHttpServer())
      .post('/connections')
      .set('x-api-key', 'valid-api-key-1')
      .send({ type: 'github' })
      .expect(400)
      .expect({ statusCode: 400, message: ['token should not be empty'], error: 'Bad Request' })
  })

  it('201 Created with connection id', () => {
    return request(app.getHttpServer())
      .post('/connections')
      .set('x-api-key', 'valid-api-key-1')
      .send({ type: 'github', token: '123' })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toMatch(/^rec_/)
      })
  })
})
