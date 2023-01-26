import { Test, TestingModule } from '@nestjs/testing'
import { CallController } from './call.controller'
import { createMock } from '@golevelup/ts-jest'
import { ConnectionsRecord } from '../../libs/xata'
import { XataService } from '../../libs/xata.service'
import { HttpModule, HttpService } from '@nestjs/axios'
import { of } from 'rxjs'

describe('CallController', () => {
  let xataService: XataService
  let httpService: HttpService
  let controller: CallController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CallController],
      providers: [XataService],
    }).compile()

    xataService = module.get<XataService>(XataService)
    httpService = module.get<HttpService>(HttpService)
    controller = module.get<CallController>(CallController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('makes an api call to provider and returns data', async () => {
    const mockConnectionsRecord = createMock<ConnectionsRecord>({
      id: 'ref_abc123',
      provider: 'github',
      token: 'mock-token',
    })
    const mockGithubUserResponse = {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      type: 'User',
      name: 'monalisa octocat',
      company: 'GitHub',
    }
    jest.spyOn(xataService, 'getConnection').mockResolvedValue(mockConnectionsRecord)
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of({ data: mockGithubUserResponse, status: 200, statusText: 'OK', headers: {}, config: {} }))

    const callResponseDto = await controller.callProvider({
      connectionId: 'ref_abc123',
      provider: 'github',
      method: 'GET',
      path: 'user',
    })

    expect(callResponseDto).toStrictEqual({
      providerStatusCode: 200,
      providerData: mockGithubUserResponse,
    })
  })
})
