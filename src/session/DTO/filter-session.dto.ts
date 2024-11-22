import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterSessionDto {
  @ApiPropertyOptional({
    description: 'Filter by teacher ID',
    example: 1,
    required: false,
    type: 'number',
  })
  @IsOptional()
  @Transform(({ value }: TransformFnParams): number =>
    value !== undefined ? Number(value) : undefined,
  )
  @IsNumber()
  teacherId?: number;

  @ApiPropertyOptional({
    description: 'Filter by room ID',
    example: 2,
    required: false,
    type: 'number',
  })
  @IsOptional()
  @Transform(({ value }: TransformFnParams): number =>
    value !== undefined ? Number(value) : undefined,
  )
  @IsNumber()
  roomId?: number;

  @ApiPropertyOptional({
    description: 'Filter by class ID',
    example: 3,
    required: false,
    type: 'number',
  })
  @IsOptional()
  @Transform(({ value }: TransformFnParams): number =>
    value !== undefined ? Number(value) : undefined,
  )
  @IsNumber()
  classId?: number;

  @ApiPropertyOptional({
    description: 'Filter by student ID',
    example: 4,
    required: false,
    type: 'number',
  })
  @IsOptional()
  @Transform(({ value }: TransformFnParams): number =>
    value !== undefined ? Number(value) : undefined,
  )
  @IsNumber()
  studentId?: number;
}
