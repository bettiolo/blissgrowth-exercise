import { Injectable } from '@nestjs/common'
import { CreateConnectionDto } from '../../libs/create-connection.dto'
import { ConnectionsRecord } from '../../libs/xata'
import { XataService } from '../../libs/xata.service'

@Injectable()
export class ConnectionsService {
  private xataService: XataService

  constructor(xataService: XataService) {
    this.xataService = xataService
  }

  async create(createConnectionDto: CreateConnectionDto): Promise<ConnectionsRecord> {
    if (!createConnectionDto.token) {
      throw new Error('Token missing')
    }

    return await this.xataService.createConnection(createConnectionDto)
  }
}
