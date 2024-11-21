import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoomCategory } from '../room.entity';

export class CreateRoomDto {
  @ApiProperty({ name: 'title', description: 'title of room' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    name: 'location',
    description: 'location of room',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ name: 'number', description: 'room number' })
  @IsOptional()
  @IsNumber()
  number?: number;

  @ApiProperty({
    name: 'category',
    description: 'category of room',
    enum: RoomCategory,
  })
  @IsNotEmpty()
  @IsEnum(RoomCategory)
  category: RoomCategory;
}
