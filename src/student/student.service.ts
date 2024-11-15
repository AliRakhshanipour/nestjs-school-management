import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClassRepository } from 'src/class/class.repository';
import { CreateStudentDto } from './DTO/create-student.dto';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    private studentRepository: StudentRepository,
    private classRepository: ClassRepository,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { ...studentData } = createStudentDto;

    const student = this.studentRepository.create({
      ...studentData,
    });

    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `There is already a student with this national code: ${studentData.nationalCode}`,
        );
      }
      throw error;
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
        throw new InternalServerErrorException('No students found');
      }

      return students; // Will be transformed by the interceptor
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
        // Re-throw NotFoundException to preserve its original intent
        throw error;
      }

      // Handle unexpected errors
      throw new InternalServerErrorException(
        'Error fetching student: ' + error.message,
      );
    }
  }
}
