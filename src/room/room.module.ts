import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { Session } from '../session/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Session])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
