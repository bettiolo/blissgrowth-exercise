import { Test } from '@nestjs/testing'
import { ConnectionsService } from './connections.service'
import { createMock } from '@golevelup/ts-jest'
import { XataService } from '../../libs/xata.service'
import { ConnectionsRecord } from '../../libs/xata'

describe('ConnectionsService', () => {
  let service: ConnectionsService

  beforeEach(async () => {
    const mockXataService = createMock<XataService>()
    const mockRecord = createMock<ConnectionsRecord>({
      id: '123',
    })

    mockXataService.createConnection.mockResolvedValue(mockRecord)

    const module = await Test.createTestingModule({
      providers: [
        ConnectionsService,
        {
          provide: XataService,
          useValue: mockXataService,
        },
      ],
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
      token: 'abc',
    })
    expect(connectionsRecord.id).toBe('123')
  })
})
