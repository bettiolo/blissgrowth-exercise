import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'

import { ApiKeyGuard, apiKeyHeader } from './api-key.guard'

describe('ApiKeyGuard', () => {
  let apiKeyGuard: ApiKeyGuard

  beforeEach(() => {
    apiKeyGuard = new ApiKeyGuard()
  })

  describe('canActivate', () => {
    it('should throw an Unauthorized (HTTP 401) error with no API Key', () => {
      const mockContext = createMock<ExecutionContext>()
      mockContext.switchToHttp().getRequest.mockReturnValue({
        headers: {},
      })

      const callCanActivate = () => apiKeyGuard.canActivate(mockContext)

      expect(callCanActivate).toThrowError(UnauthorizedException)
    })

    it('should throw an Unauthorized (HTTP 401) error with an invalid API Key', () => {
      const mockContext = createMock<ExecutionContext>()
      mockContext.switchToHttp().getRequest.mockReturnValue({
        headers: { [apiKeyHeader]: 'invalid-api-key' },
      })

      const callCanActivate = () => apiKeyGuard.canActivate(mockContext)

      expect(callCanActivate).toThrowError(UnauthorizedException)
    })

    it('should return true with a valid api key', () => {
      const mockContext = createMock<ExecutionContext>()
      mockContext.switchToHttp().getRequest.mockReturnValue({
        headers: { [apiKeyHeader]: 'valid-api-key-1' },
      })

      const canActivate = apiKeyGuard.canActivate(mockContext)

      expect(canActivate).toBe(true)
    })
  })
})
