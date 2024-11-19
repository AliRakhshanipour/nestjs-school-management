import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ name: 'firstName', description: 'teacher first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ name: 'lastName', description: 'teacher last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ name: 'personalCode', description: 'teacher personal code' })
  @IsString()
  personalCode: string;

  @ApiProperty({ name: 'nationalCode', description: 'teacher national code' })
  @IsString()
  @Length(10, 10, { message: 'national code length must be 10' })
  nationalCode: string;

  @ApiProperty({ name: 'phoneNumber', description: 'teacher phone number' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ name: 'address', description: 'teacher address' })
  @IsString()
  @IsOptional()
  address?: string;
}
