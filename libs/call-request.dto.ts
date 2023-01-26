import { IsNotEmpty, Matches, IsIn, IsString, isNotEmpty, IsUrl } from 'class-validator'

export class CallRequestDto {
  @IsNotEmpty()
  @Matches(/^rec_/)
  connectionId: string

  @IsNotEmpty()
  @IsIn(['GET'])
  method: string

  @IsNotEmpty()
  @IsIn(['github'])
  provider: string

  // Test the regex here: https://regex101.com/r/IWjhZR/4
  @Matches(/^(?!\/)[^?\n]+/) // Regex to match the path in the url
  path: string
}
