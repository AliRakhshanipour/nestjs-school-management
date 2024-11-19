import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTeacherDto {
  @ApiProperty({ name: 'firstName', description: 'teacher first name' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ name: 'lastName', description: 'teacher last name' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ name: 'personalCode', description: 'teacher personal code' })
  @IsString()
  @IsOptional()
  personalCode?: string;

  @ApiProperty({ name: 'nationalCode', description: 'teacher national code' })
  @IsString()
  @IsOptional()
  @Length(10, 10, { message: 'national code length must be 10' })
  nationalCode?: string;

  @ApiProperty({ name: 'phoneNumber', description: 'teacher phone number' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ name: 'address', description: 'teacher address' })
  @IsString()
  @IsOptional()
  address?: string;
}
