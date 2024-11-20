import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/class/class.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateSessionDto } from './DTO/create-session.dto';
import { Session } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const { teacherId, classId, startTime, endTime, day, title } =
      createSessionDto;

    // Validate teacher
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher not found with id: ${teacherId}`);
    }

    // Validate class
    const classEntity = await this.classRepository.findOne({
      where: { id: classId },
    });
    if (!classEntity) {
      throw new NotFoundException(`Class not found with id: ${classId}`);
    }

    // Check for overlapping sessions in the same class
    const overlappingClassSessions = await this.sessionRepository.findOne({
      where: [
        {
          class: classEntity,
          day,
          startTime: LessThanOrEqual(endTime),
          endTime: MoreThanOrEqual(startTime),
        },
      ],
    });

    if (overlappingClassSessions) {
      throw new ConflictException(
        `Another session exists in this class that overlaps with the provided time`,
      );
    }

    // Check for overlapping sessions for the teacher
    const overlappingTeacherSessions = await this.sessionRepository.findOne({
      where: [
        {
          teacher,
          day,
          startTime: LessThanOrEqual(endTime),
          endTime: MoreThanOrEqual(startTime),
        },
      ],
    });

    if (overlappingTeacherSessions) {
      throw new ConflictException(
        `Teacher is already assigned to another session that overlaps with the provided time`,
      );
    }

    // Create and save session
    const session = this.sessionRepository.create({
      title,
      startTime,
      endTime,
      day,
      teacher,
      class: classEntity,
    });

    return this.sessionRepository.save(session);
  }
}
