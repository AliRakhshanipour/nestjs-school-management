import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FieldRepository } from 'src/field/field.repository';
import { GradeRepository } from 'src/grade/grade.repository';
import { DataSource } from 'typeorm';
import { Class } from './class.entity';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './DTO/create-class.dto';
import { UpdateClassDto } from './DTO/update-class.dto';

@Injectable()
export class ClassService {
  private classRepository: ClassRepository;
  private gradeRepository: GradeRepository;
  private fieldRepository: FieldRepository;

  constructor(private dataSource: DataSource) {
    this.classRepository = new ClassRepository(this.dataSource);
    this.gradeRepository = new GradeRepository(this.dataSource);
    this.fieldRepository = new FieldRepository(this.dataSource);
  }

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    const { title, gradeId, fieldId, capacity } = createClassDto;
    const existingClass = await this.classRepository.findOne({
      where: { title },
    });
    if (existingClass) {
      throw new ConflictException(`Class with title "${title}" already exists`);
    }
    const grade = await this.gradeRepository.findOne({
      where: { id: gradeId },
    });
    if (!grade) {
      throw new NotFoundException(`Grade with ID ${gradeId} not found`);
    }
    const field = await this.fieldRepository.findOne({
      where: { id: fieldId },
    });
    if (!field) {
      throw new NotFoundException(`Field with ID ${fieldId} not found`);
    }
    const newClass = this.classRepository.create({
      title,
      grade,
      field,
      capacity,
    });
    return await this.classRepository.save(newClass);
  }

  async getClasses(): Promise<any[]> {
    const classes = await this.classRepository.find({
      relations: ['grade', 'field'],
    });

    if (!classes.length) {
      throw new NotFoundException('No classes found');
    }

    return classes;
  }

  async getClassById(id: number): Promise<Class> {
    const result = await this.classRepository.findOne({
      where: { id },
      relations: ['grade', 'field'],
    });

    if (!result) throw new NotFoundException(`Class with ID ${id} not found`);

    return result;
  }

  async updateClass(
    id: number,
    updateClassDto: UpdateClassDto,
  ): Promise<Class> {
    const { title, gradeId, fieldId, capacity } = updateClassDto;

    const existingClass = await this.classRepository.findOne({
      where: { id },
      relations: ['grade', 'field'],
    });

    if (!existingClass) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    if (title) {
      const checkTitleExists = await this.classRepository.findOne({
        where: { title },
      });
      if (checkTitleExists) {
        throw new ConflictException('this class title already exists');
      }
      existingClass.title = title;
    }

    if (gradeId) {
      const grade = await this.gradeRepository.findOne({
        where: { id: gradeId },
      });
      if (!grade) {
        throw new NotFoundException(`Grade with ID ${gradeId} not found`);
      }
      existingClass.grade = grade;
    }

    if (fieldId) {
      const field = await this.fieldRepository.findOne({
        where: { id: fieldId },
      });

      if (!field) {
        throw new NotFoundException(`Field with ID ${fieldId} not found`);
      }

      existingClass.field = field;
    }

    if (capacity) {
      existingClass.capacity = capacity;
    }
    return await this.classRepository.save(existingClass);
  }

  async deleteClass(id: number): Promise<void> {
    const existingClass = await this.classRepository.findOne({ where: { id } });

    if (!existingClass) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    await this.classRepository.delete(existingClass);
  }
}
