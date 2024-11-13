import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetGradeDto {
  @ApiProperty({ description: 'grade id', example: 1 })
  @IsNumber()
  id: number;
}
