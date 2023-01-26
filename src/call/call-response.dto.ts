import { IsNotEmpty, IsNumber, Allow } from 'class-validator'

export class CallResponseDto {
  @IsNotEmpty()
  @IsNumber()
  providerStatusCode: number

  @Allow()
  providerData: any
}
