import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

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

  @IsOptional()
  @IsEnum(Role)
  role: number
}
