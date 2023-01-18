import { Module } from '@nestjs/common'
import { ConnectionsController } from './connections/connections.controller'
import { ConnectionsService } from './connections/connections.service'
import { XataService } from '../libs/xata.service'

@Module({
  imports: [],
  controllers: [ConnectionsController],
  providers: [ConnectionsService, XataService],
})
export class AppModule {}
