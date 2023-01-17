import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'

// This should be a secure storage, but for now we can do with this.
import { apiKeys } from './api-keys.json'

// Guards Docs: https://docs.nestjs.com/guards
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): true | never {
    const request = context.switchToHttp().getRequest<Request>()
    const apiKey = request.headers['X-API-KEY']
    const validApiKey = apiKeys.includes(apiKey)

    if (!validApiKey) {
      throw new UnauthorizedException() // Will result in a 401
    }

    return true
  }
}
