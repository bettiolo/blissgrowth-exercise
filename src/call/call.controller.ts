import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { CallResponseDto } from './call-response.dto'
import { XataService } from '../../libs/xata.service'
import { HttpService } from '@nestjs/axios'
import { CallRequestDto } from './call-request.dto'
import { ApiKeyGuard } from '../api-key.guard'

@Controller('call')
export class CallController {
  baseUrls = {
    github: 'https://api.github.com',
  }

  configs = {
    github: ({ token }) => ({
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }),
  }

  constructor(private readonly xataService: XataService, private readonly httpService: HttpService) {}

  @UseGuards(ApiKeyGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidUnknownValues: true }))
  @Get(':connectionId/:method/:provider/:path(*)')
  async callProvider(@Param() { connectionId, method, provider, path }: CallRequestDto): Promise<CallResponseDto> {
    const connection = await this.xataService.getConnection(connectionId)
    const baseUrl = this.baseUrls[provider]
    const url = `${baseUrl}/${path}`
    const config = this.configs[provider](connection)
    // TODO: Handle `method`
    const response = await this.httpService.get(url, config).toPromise()

    return {
      providerStatusCode: response.status,
      providerData: response.data,
    }
  }
}
