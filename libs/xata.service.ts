import { Injectable } from '@nestjs/common'
import { getXataClient, ConnectionsRecord } from './xata'
import { CreateConnectionDto } from './create-connection.dto'

@Injectable()
export class XataService {
  async createConnection(createConnectionDto: CreateConnectionDto): Promise<ConnectionsRecord> {
    return await getXataClient().db.connections.create(createConnectionDto)
  }

  async getConnection(id: string): Promise<ConnectionsRecord> {
    return await getXataClient().db.connections.read(id)
  }
}
