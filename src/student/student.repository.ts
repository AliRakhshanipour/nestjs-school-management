import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private datasource: DataSource) {
    super(Student, datasource.createEntityManager());
  }
}
