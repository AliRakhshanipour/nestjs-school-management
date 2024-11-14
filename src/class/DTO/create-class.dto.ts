// src/class/DTO/create-class.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Mathematics 101' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  gradeId: number;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  fieldId: number;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsNumber()
  capacity?: number;
}
