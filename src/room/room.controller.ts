import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './DTO/create-room.dto';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { UpdateRoomDTO } from './DTO/update-room.dto';

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

  @Get('')
  @ApiOperation({ description: 'get all rooms method' })
  @ApiResponse({
    status: '2XX',
    description: 'rooms retrieved successfully',
  })
  @ApiResponse({
    status: '4XX',
    description: 'no room exists',
  })
  @ApiResponse({
    status: '5XX',
    description: 'internal server error',
  })
  async getAllRooms(): Promise<Room[]> {
    return await this.roomService.getAllRooms();
  }

  @Get(':id')
  @ApiOperation({ description: 'get room by id' })
  @ApiResponse({ status: '2XX', description: 'room retrieved successfully' })
  @ApiResponse({ status: '4XX', description: 'room not found' })
  @ApiResponse({ status: '5XX', description: 'internal server error' })
  async getRoomById(@Param('id') id: number): Promise<Room> {
    return await this.roomService.getRoomById(id);
  }

  @Patch(':id/update')
  @ApiOperation({ description: 'update room method' })
  @ApiResponse({ status: '2XX', description: 'room updated successfully' })
  @ApiResponse({ status: '4XX', description: 'room not found' })
  @ApiResponse({ status: '5XX', description: 'internal server error' })
  async updateRoom(
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDTO,
  ): Promise<Room> {
    return await this.roomService.updateRoom(id, updateRoomDto);
  }

  @Delete(':id/delete')
  @ApiOperation({ description: 'delete room method' })
  @ApiResponse({ status: '2XX', description: 'room delete successfully' })
  @ApiResponse({ status: '4XX', description: 'room not found' })
  @ApiResponse({ status: '5XX', description: 'internal server error' })
  async deleteRoom(@Param('id') id: number): Promise<void> {
    await this.roomService.deleteRoom(id);
  }
}
