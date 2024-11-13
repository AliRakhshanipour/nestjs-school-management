import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Field } from './field.entity';

@Injectable()
export class FieldRepository extends Repository<Field> {
  constructor(private datasource: DataSource) {
    super(Field, datasource.createEntityManager());
  }

  async createField(title: string): Promise<Field> {
    const field = this.create({ title });
    return await this.save(field);
  }

  async getAllFields(): Promise<Field[]> {
    return await this.find();
  }

  async getField(id: number): Promise<Field> {
    return await this.findOne({ where: { id } });
  }
}
