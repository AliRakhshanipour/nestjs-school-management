import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './DTO/create-room.dto';
import { Room } from './room.entity';
import { UpdateRoomDTO } from './DTO/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const { title, location, category, number } = createRoomDto;

    try {
      const existingRoom: Room = await this.roomRepository.findOne({
        where: [{ title }, { number }],
      });

      if (existingRoom) {
        throw new ConflictException(
          `A room with the title "${title}" or number "${number}" already exists.`,
        );
      }

      const room: Room = this.roomRepository.create({
        title,
        location,
        category,
        number,
      });

      return await this.roomRepository.save(room);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllRooms(): Promise<Room[]> {
    try {
      const rooms: Room[] = await this.roomRepository.find();

      if (rooms.length === 0) {
        throw new NotFoundException('no room exists');
      }

      return rooms;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(error.message);
    }
  }

  async getRoomById(id: number): Promise<Room> {
    try {
      const room: Room = await this.roomRepository.findOne({ where: { id } });
      if (!room) {
        throw new NotFoundException(`no room found with this id: ${id}`);
      }

      return room;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateRoom(
    roomId: number,
    updateRoomDto: UpdateRoomDTO,
  ): Promise<Room> {
    try {
      const room: Room = await this.roomRepository.findOne({
        where: { id: roomId },
      });
      if (!room) {
        throw new NotFoundException(`no room found with this id: ${roomId}`);
      }

      Object.assign(room, updateRoomDto);

      return await this.roomRepository.save(room);
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteRoom(roomId: number): Promise<void> {
    try {
      const room: Room = await this.roomRepository.findOne({
        where: { id: roomId },
      });
      if (!room) {
        throw new NotFoundException(`no room found with this id: ${roomId}`);
      }
      await this.roomRepository.delete(roomId);
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException(e);
    }
  }
}
