import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGradeDto {
  @ApiProperty({ description: 'grade title', example: '10th' })
  @IsString()
  title: string;
}
