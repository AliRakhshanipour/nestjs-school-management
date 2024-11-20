import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { CreateTeacherDto } from './DTO/create-teacher.dto';
import { UpdateTeacherDto } from './DTO/update-teacher.dto';
import { NationalCodeExistsException } from './error-handlers/national-code-exists.exception';
import { PersonalCodeExistsException } from './error-handlers/personal-code-exists.exception';
import { GetAllTeachersResponse } from './interfaces/get-teachers.interface';
import { Teacher } from './teacher.entity';
import { TeacherRepository } from './teacher.repository';
@Injectable()
export class TeacherService {
  constructor(private teacherRepository: TeacherRepository) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { nationalCode, personalCode, ...otherData } = createTeacherDto;

    try {
      // Check for existing teacher with the same nationalCode
      const existingNationalCodeTeacher = await this.teacherRepository.findOne({
        where: { nationalCode },
      });
      if (existingNationalCodeTeacher) {
        throw new NationalCodeExistsException(nationalCode);
      }

      const existingPersonalCodeTeacher = await this.teacherRepository.findOne({
        where: { personalCode },
      });
      if (existingPersonalCodeTeacher) {
        throw new PersonalCodeExistsException(personalCode);
      }

      const teacher = this.teacherRepository.create({
        nationalCode,
        personalCode,
        ...otherData,
      });
      return await this.teacherRepository.save(teacher);
    } catch (error) {
      if (
        error instanceof NationalCodeExistsException ||
        error instanceof PersonalCodeExistsException
      ) {
        throw error;
      }

      if (error.code === '23505') {
        throw new ConflictException(
          'A teacher with this unique field already exists.',
        );
      }

      throw new InternalServerErrorException(
        `An error occurred while creating the teacher: ${error.message}`,
      );
    }
  }

  async getAllTeachers(): Promise<GetAllTeachersResponse> {
    try {
      const [teachers, teacherCount] =
        await this.teacherRepository.findAndCount();

      return { teachers, teacherCount };
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving teachers: ${error.message}`,
      );
    }
  }

  async getTeacherById(id: number): Promise<Teacher> {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { id } });
      if (!teacher)
        throw new NotFoundException(`Teacher With This Id: ${id} Not Found`);

      return teacher;
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving the teacher: ${error.message}`,
      );
    }
  }

  async updateTeacher(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    try {
      let cleanedData = _.omitBy(updateTeacherDto, _.isNil);
      cleanedData = _.omitBy(cleanedData, (value) => value === '');

      const teacher = await this.teacherRepository.findOne({ where: { id } });
      if (!teacher)
        throw new NotFoundException(`Teacher With This Id: ${id} Not Found`);

      Object.assign(teacher, cleanedData);

      return await this.teacherRepository.save(teacher);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteTeacher(id: number): Promise<void> {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { id } });
      if (!teacher)
        throw new NotFoundException(`Teacher With This Id: ${id} Not Found`);

      await this.teacherRepository.delete(teacher);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
