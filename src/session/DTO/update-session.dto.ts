import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { DayOfWeek } from '../session.entity';

export class UpdateSessionDto {
  @ApiProperty({ description: 'Session title', example: 'Mathematics Class' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Session start time (HH:mm)', example: '10:00' })
  @IsOptional()
  @IsString() // Ensure it's a string for Swagger
  startTime?: string;

  @ApiProperty({ description: 'Session end time (HH:mm)', example: '12:00' })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiProperty({
    description: 'Day of the week',
    example: 'Monday',
    enum: DayOfWeek,
  })
  @IsOptional()
  @IsEnum(DayOfWeek)
  day?: DayOfWeek;

  @ApiProperty({
    description: 'teacher ID',
    example: 1,
    type: Number, // Specify the type for Swagger
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) // Parse '1,2' to [1, 2]
  @IsNumber()
  teacherId?: number;

  @ApiProperty({ description: 'Class ID', example: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) // Parse '1' to 1
  @IsNumber()
  classId?: number;
}
