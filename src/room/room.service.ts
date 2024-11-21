import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './DTO/create-room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const { title, location, category, number } = createRoomDto;

    try {
      const existingRoom = await this.roomRepository.findOne({
        where: [{ title }, { number }],
      });

      if (existingRoom) {
        throw new ConflictException(
          `A room with the title "${title}" or number "${number}" already exists.`,
        );
      }

      const room = this.roomRepository.create({
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
}
