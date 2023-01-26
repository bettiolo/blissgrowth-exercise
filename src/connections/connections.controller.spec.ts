import { Test, TestingModule } from '@nestjs/testing'
import { ConnectionsController } from './connections.controller'
import { ConnectionsService } from './connections.service'
import { XataService } from '../../libs/xata.service'
import { ConnectionsRecord } from '../../libs/xata'
import { createMock } from '@golevelup/ts-jest'

describe('ConnectionsController', () => {
  let service: ConnectionsService
  let controller: ConnectionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [ConnectionsService, XataService],
    }).compile()

    service = module.get<ConnectionsService>(ConnectionsService)
    controller = module.get<ConnectionsController>(ConnectionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('returns a connection reference', async () => {
    const mockConnectionsRecord = createMock<ConnectionsRecord>({
      id: 'ref_abc123',
    })
    jest.spyOn(service, 'create').mockResolvedValue(mockConnectionsRecord)

    const connectionsRecord = await controller.create({ provider: 'github', token: 'abc123' })

    expect(connectionsRecord.id).toBe('ref_abc123')
  })
})
