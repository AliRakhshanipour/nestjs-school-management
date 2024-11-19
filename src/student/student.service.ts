import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { ClassRepository } from 'src/class/class.repository';
import { CreateStudentDto } from './DTO/create-student.dto';
import { UpdateStudentDto } from './DTO/update-student.dto';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    private studentRepository: StudentRepository,
    private classRepository: ClassRepository,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { nationalCode, ...studentData } = createStudentDto;
    console.log(createStudentDto);

    // Optional: Check if student with the same nationalCode already exists
    const existingStudent = await this.studentRepository.findOne({
      where: { nationalCode },
    });

    if (existingStudent) {
      throw new ConflictException(
        `There is already a student with this national code: ${nationalCode}`,
      );
    }

    const student = this.studentRepository.create({
      ...studentData, // Spread other fields from DTO
      nationalCode, // Include nationalCode explicitly in the entity creation
    });

    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      // Handle unique constraint violation (Code 23505)
      if (error.code === '23505') {
        throw new ConflictException(
          `There is already a student with this national code: ${nationalCode}`,
        );
      }
      // General error handling
      throw new InternalServerErrorException(
        'Error creating student: ' + error.message,
      );
    }
  }

  async assignStudentToClass(
    studentId: number,
    classId: number,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const classEntity = await this.classRepository.findOne({
      where: { id: classId },
    });
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found`);
    }

    student.class = classEntity;
    return await this.studentRepository.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    try {
      const students = await this.studentRepository.find({
        relations: ['class'],
      });

      if (!students || students.length === 0) {
        throw new NotFoundException('No students found');
      }

      return students;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching students: ' + error.message,
      );
    }
  }
  async getStudentById(id: number): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { id },
        relations: ['class'],
      });

      if (!student) {
        throw new NotFoundException(`No student found with ID ${id}`);
      }

      return student;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error fetching student: ' + error.message,
      );
    }
  }

  async updateStudent(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    let cleanedData = _.omitBy(updateStudentDto, _.isNil);
    cleanedData = _.omitBy(cleanedData, (value) => value === '');

    if (!Object.keys(cleanedData).length) {
      throw new Error('No valid fields to update');
    }
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    Object.assign(student, cleanedData);

    await this.studentRepository.save(student);

    return await this.studentRepository.findOne({
      where: { id },
      relations: ['class'],
    });
  }

  async deleteStudent(id: number): Promise<void> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student)
      throw new NotFoundException(`Student with ID ${id} not found`);

    await this.studentRepository.delete(student);
  }
}
