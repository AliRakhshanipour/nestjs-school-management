import { IsOptional, IsString } from 'class-validator';
import { User } from '../user.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreateUserResponseDto {
  @IsString()
  message: string;
  user: User;
}
