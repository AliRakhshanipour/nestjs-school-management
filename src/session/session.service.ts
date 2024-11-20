import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/class/class.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateSessionDto } from './DTO/create-session.dto';
import { SessionResponseDto } from './DTO/response-session.dto';
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

  async getAllSessions(): Promise<SessionResponseDto[]> {
    const sessions = await this.sessionRepository.find({
      relations: ['teacher', 'class'], // Ensure related entities are loaded
    });

    return sessions.map((session) => this.sessionTransformToDto(session));
  }

  async getSessionById(id: number): Promise<SessionResponseDto> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['teacher', 'class'],
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }

    return this.sessionTransformToDto(session);
  }

  async deleteSession(id: number): Promise<void> {
    try {
      const session = await this.teacherRepository.findOne({ where: { id } });
      if (!session)
        throw new NotFoundException(`session not found with this id :${id}`);

      await this.teacherRepository.delete(session);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private sessionTransformToDto(session: Session): SessionResponseDto {
    return {
      id: session.id,
      title: session.title,
      startTime: session.startTime,
      endTime: session.endTime,
      day: session.day,
      teacherFullName: `${session.teacher.firstName} ${session.teacher.lastName}`,
      classTitle: session.class.title,
    };
  }
}
