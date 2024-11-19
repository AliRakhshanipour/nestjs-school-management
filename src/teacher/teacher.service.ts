import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTeacherDto } from './DTO/create-teacher.dto';
import { NationalCodeExistsException } from './error-handlers/national-code-exists.exception';
import { PersonalCodeExistsException } from './error-handlers/personal-code-exists.exception';
import { Teacher } from './teache.entity';
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
}
