import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'firstName',
    description: 'student first name',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    name: 'firstName',
    description: 'student first name',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'fatherName',
    description: 'student father name',
    required: false,
  })
  fatherName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'nationalCode',
    description: 'student national code',
    required: false,
  })
  nationalCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'phoneNumber',
    description: 'student phone number',
    required: false,
  })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'emgPhoneNumber',
    description: 'student emergency phone number',
    required: false,
  })
  emgPhoneNumber?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    name: 'dateOfBirth',
    description: 'student birth day',
    required: false,
  })
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'address',
    description: 'student address',
    required: false,
  })
  address?: string;
}
