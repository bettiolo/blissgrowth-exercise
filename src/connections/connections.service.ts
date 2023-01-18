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

  async create(createConnectionDto: CreateConnectionDto): Promise<{ id: string }> {
    if (!createConnectionDto.token) {
      throw new Error('Token missing')
    }

    const connection = await this.xataService.createConnection(createConnectionDto)
    return { id: connection.id }
  }
}
