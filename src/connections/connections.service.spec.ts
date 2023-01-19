import { Test } from '@nestjs/testing'
import { ConnectionsService } from './connections.service'
// import { createMock } from '@golevelup/ts-jest'
import { XataService } from '../../libs/xata.service'
import { createMock } from '@golevelup/ts-jest'
import { ConnectionsRecord } from '../../libs/xata'

describe('ConnectionsService', () => {
  let xata: XataService
  let service: ConnectionsService

  beforeEach(async () => {
    // const mockXataService = createMock<XataService>()
    // const mockRecord = createMock<ConnectionsRecord>({
    //   id: 'rec_123',
    // })
    // mockXataService.createConnection.mockResolvedValue(mockRecord)

    const module = await Test.createTestingModule({
      // To use the above mock, replace `XataService` with `mockXataService`
      providers: [ConnectionsService, XataService],
    }).compile()

    xata = module.get<XataService>(XataService)
    service = module.get<ConnectionsService>(ConnectionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a connection and return only id', async () => {
    const mockConnectionsRecord = createMock<ConnectionsRecord>({
      id: 'ref_abc123',
      type: 'mock-type',
      token: 'token-abc123',
    })
    jest.spyOn(xata, 'createConnection').mockImplementation(async () => mockConnectionsRecord)

    const connectionsRecord = await service.create({
      type: 'github',
      token: 'abc123',
    })

    expect(connectionsRecord).toStrictEqual({ id: 'ref_abc123' })
  })
})
