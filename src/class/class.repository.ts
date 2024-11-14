import { DataSource, Repository } from 'typeorm';
import { Class } from './class.entity';

export class ClassRepository extends Repository<Class> {
  constructor(private datasource: DataSource) {
    super(Class, datasource.createEntityManager());
  }
}
