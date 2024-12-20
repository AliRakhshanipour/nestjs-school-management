import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetUserByIdDto {
  @ApiProperty({ description: 'user id', example: 1 })
  @IsNumber()
  id: number;
}
