import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'First name of the student',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the student',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  lastName: string;

  @ApiProperty({
    description: "Father's name of the student",
    example: 'Michael',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  fatherName: string;

  @ApiProperty({
    description: 'Primary phone number of the student',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsPhoneNumber(null)
  phoneNumber: string;

  @ApiProperty({
    description: 'Emergency contact phone number of the student',
    example: '+0987654321',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber(null)
  emgPhoneNumber?: string;

  @ApiProperty({
    description: 'Date of birth of the student',
    example: '2000-01-01',
    type: Date,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Address of the student',
    example: '123 Main St, Anytown',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Active status of the student',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'ID of the class to which the student belongs',
    example: 1,
  })
  @IsNotEmpty()
  classId: number;
}
