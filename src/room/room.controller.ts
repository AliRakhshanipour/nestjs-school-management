import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './DTO/create-room.dto';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Controller('room')
@ApiTags('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('create')
  @ApiOperation({ description: 'create room method' })
  @ApiResponse({
    status: '2XX',
    description: 'room created successfully',
  })
  @ApiResponse({
    status: '4XX',
    description: 'room not created',
  })
  @ApiResponse({
    status: '5XX',
    description: 'internal server error',
  })
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return await this.roomService.createRoom(createRoomDto);
  }
}
