import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/class.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { SessionController } from './session.controller';
import { Session } from './session.entity';
import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Class, Teacher])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
