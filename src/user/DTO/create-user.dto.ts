import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { User } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'username of user that is unique',
    example: 'JohnDoe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'password of user that is unique',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'phone number of user that is unique',
    example: '09123456789',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreateUserResponseDto {
  @IsString()
  message: string;
  user: User;
}
