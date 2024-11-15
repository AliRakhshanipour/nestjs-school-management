import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassRepository extends Repository<Class> {
  constructor(private dataSource: DataSource) {
    super(Class, dataSource.createEntityManager());
  }
}
