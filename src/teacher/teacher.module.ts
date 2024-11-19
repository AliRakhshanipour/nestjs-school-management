import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teache.entity';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository],
})
export class TeacherModule {}
