import { IsIn, IsNotEmpty } from 'class-validator'

export class CreateConnectionDto {
  @IsNotEmpty()
  @IsIn(['github'])
  provider: string

  @IsNotEmpty()
  token: string
}
