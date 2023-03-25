import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string

  @IsString()
  email: string

  @IsString()
  password: string

  @IsString()
  birthAt: string


  created_at: string


  updated_at: string

  role: number
}
