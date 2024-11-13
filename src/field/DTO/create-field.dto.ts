import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty({ description: 'field title', example: 'electronic' })
  @IsString()
  title: string;
}
