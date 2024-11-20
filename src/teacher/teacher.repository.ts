import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
  constructor(private datasource: DataSource) {
    super(Teacher, datasource.createEntityManager());
  }
}
