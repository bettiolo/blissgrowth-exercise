import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateConnectionDto } from '../../libs/create-connection.dto'
import { XataService } from '../../libs/xata.service'

@Injectable()
export class ConnectionsService {
  private xataService: XataService

  constructor(xataService: XataService) {
    this.xataService = xataService
  }

  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  async create(createConnectionDto: CreateConnectionDto): Promise<{ id: string }> {
    const connection = await this.xataService.createConnection(createConnectionDto)
    return { id: connection.id }
  }
}
