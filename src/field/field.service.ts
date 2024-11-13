import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateFieldDto } from './DTO/create-field.dto';
import { UpdateFieldDto } from './DTO/update-field.dto';
import { Field } from './field.entity';
import { FieldRepository } from './field.repository';

@Injectable()
export class FieldService {
  private fieldRepository: FieldRepository;
  constructor(private datasource: DataSource) {
    this.fieldRepository = new FieldRepository(this.datasource);
  }

  async createField(createFieldDto: CreateFieldDto): Promise<Field> {
    try {
      const field = this.fieldRepository.create(createFieldDto);
      const savedField = await this.fieldRepository.save(field);
      if (!savedField) {
        throw new BadRequestException('Field creation failed');
      }
      return savedField;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error occurred');
    }
  }

  async getFields(): Promise<Field[]> {
    try {
      const fields = await this.fieldRepository.find();
      return fields;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve fields');
    }
  }
  async getFieldById(id: number): Promise<Field> {
    try {
      const field = await this.fieldRepository.findOne({ where: { id } });
      if (!field) {
        throw new NotFoundException(`Field with ID ${id} not found`);
      }
      return field;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while retrieving the field',
      );
    }
  }

  async updateField(
    id: number,
    updateFieldDto: UpdateFieldDto,
  ): Promise<Field> {
    const { title } = updateFieldDto;
    const field = await this.fieldRepository.findOne({ where: { id } });
    if (!field) {
      throw new NotFoundException(`No field found with ID ${id}`);
    }

    try {
      field.title = title;
      return await this.fieldRepository.save(field);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          'Invalid data provided for updating field',
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while updating the field',
      );
    }
  }

  async deleteField(id: number): Promise<void> {
    const field = await this.fieldRepository.findOne({ where: { id } });
    if (!field) {
      throw new NotFoundException(`No field found with ID ${id}`);
    }

    try {
      await this.fieldRepository.delete(field);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          'Invalid data provided for deleting field',
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the field',
      );
    }
  }
}
