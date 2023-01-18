import { Test } from '@nestjs/testing'
import { ConnectionsService } from './connections.service'
// import { createMock } from '@golevelup/ts-jest'
import { XataService } from '../../libs/xata.service'

describe('ConnectionsService', () => {
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

    service = module.get<ConnectionsService>(ConnectionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should throw an error if no token specified', async () => {
    expect.assertions(2)

    try {
      await service.create({
        type: 'github',
        token: '',
      })
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Token missing')
    }
  })

  it('should create a connection', async () => {
    const connectionsRecord = await service.create({
      type: 'github',
      token: 'abc123',
    })
    expect(connectionsRecord.id).toMatch(/^rec_/)
  })
})
