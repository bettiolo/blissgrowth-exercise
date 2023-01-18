import { Module } from '@nestjs/common'
import { ConnectionsService } from './connections.service'
import { ConnectionsController } from './connections.controller'
import { XataService } from '../../libs/xata.service'

@Module({
  controllers: [ConnectionsController],
  providers: [ConnectionsService, XataService],
})
export class ConnectionsModule {}
