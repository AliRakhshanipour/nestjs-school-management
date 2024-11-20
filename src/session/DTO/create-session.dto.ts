import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DayOfWeek } from '../session.entity';

export class CreateSessionDto {
  @ApiProperty({ description: 'Session title', example: 'Mathematics Class' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Session start time (HH:mm)', example: '10:00' })
  @IsNotEmpty()
  @IsString() // Ensure it's a string for Swagger
  startTime: string;

  @ApiProperty({ description: 'Session end time (HH:mm)', example: '12:00' })
  @IsNotEmpty()
  @IsString()
  endTime: string;

  @ApiProperty({
    description: 'Day of the week',
    example: 'Monday',
    enum: DayOfWeek,
  })
  @IsNotEmpty()
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ApiProperty({
    description: 'Array of teacher IDs',
    example: 1,
    type: Number, // Specify the type for Swagger
  })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10)) // Parse '1,2' to [1, 2]
  @IsNumber()
  teacherId: number;

  @ApiProperty({ description: 'Class ID', example: 1 })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10)) // Parse '1' to 1
  @IsNumber()
  classId: number;
}
