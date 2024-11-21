import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoomCategory } from '../room.entity';

export class UpdateRoomDTO {
  @ApiProperty({ name: 'title', description: 'title of room' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    name: 'location',
    description: 'location of room',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ name: 'number', description: 'room number' })
  @IsNumber()
  @IsOptional()
  number?: number;

  @ApiProperty({
    name: 'category',
    description: 'category of room',
    enum: RoomCategory,
  })
  @IsEnum(RoomCategory)
  @IsOptional()
  category?: RoomCategory;
}
