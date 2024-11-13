import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Field } from './field.entity';
import { FieldRepository } from './field.repository';

@Injectable()
export class FieldService {
  private fieldRepository: FieldRepository;
  constructor(private datasource: DataSource) {
    this.fieldRepository = new FieldRepository(this.datasource);
  }

  async createField(title: string): Promise<Field> {
    return this.fieldRepository.createField(title);
  }

  async getFields(): Promise<Field[]> {
    return this.fieldRepository.getAllFields();
  }

  async getFieldById(id: number): Promise<Field> {
    const field = await this.fieldRepository.getField(id);
    if (!field) throw new NotFoundException('no field found with id');
    return field;
  }

  async updateField(id: number, title: string): Promise<Field> {
    const field = await this.fieldRepository.findOne({ where: { id } });
    if (!field) {
      throw new NotFoundException('no field found with this id');
    }
    field.title = title;
    return await this.fieldRepository.save(field);
  }
}
