import { Module } from '@nestjs/common'
import { ConnectionsController } from './connections/connections.controller'
import { ConnectionsService } from './connections/connections.service'
import { XataService } from '../libs/xata.service'
import { CallController } from './call/call.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [ConnectionsController, CallController],
  providers: [ConnectionsService, XataService],
})
export class AppModule {}
