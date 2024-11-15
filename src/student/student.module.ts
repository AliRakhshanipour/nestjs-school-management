import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassRepository } from 'src/class/class.repository';
import { StudentController } from './student.controller';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService, StudentRepository, ClassRepository],
  controllers: [StudentController],
})
export class StudentModule {}
