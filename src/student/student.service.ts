import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateStudentDto } from './DTO/create-student.dto';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  private studentRepository: StudentRepository;
  constructor(private datasource: DataSource) {
    this.studentRepository = new StudentRepository(datasource);
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(student);
  }
}
