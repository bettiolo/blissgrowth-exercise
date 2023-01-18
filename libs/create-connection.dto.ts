// import { Connections } from './xata'
import { IsEnum, IsIn, IsNotEmpty } from 'class-validator'
// import { OmitType } from '@nestjs/mapped-types'

export class CreateConnectionDto {
  @IsNotEmpty()
  @IsIn(['github'])
  type: string

  @IsNotEmpty()
  token: string
}
