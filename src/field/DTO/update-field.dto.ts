import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateFieldDto {
  @ApiProperty({ description: 'field title' })
  @IsString()
  title: string;
}
