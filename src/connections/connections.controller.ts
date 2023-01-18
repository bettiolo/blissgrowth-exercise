import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common'
import { ConnectionsService } from './connections.service'
import { CreateConnectionDto } from '../../libs/create-connection.dto'
import { ApiKeyGuard } from '../api-key.guard'

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  async create(@Body() createConnectionDto: CreateConnectionDto) {
    if (!createConnectionDto.type) {
      throw new BadRequestException('Field invalid: type')
    }
    try {
      return await this.connectionsService.create(createConnectionDto)
    } catch (e) {
      throw new HttpException(e, 500)
    }
  }
}
