import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Class } from 'src/class/class.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateSessionDto } from './DTO/create-session.dto';
import { SessionResponseDto } from './DTO/response-session.dto';
import { UpdateSessionDto } from './DTO/update-session.dto';
import { DayOfWeek, Session } from './session.entity';

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

  async createSession(
    createSessionDto: CreateSessionDto,
  ): Promise<SessionResponseDto> {
    const { teacherId, classId, startTime, endTime, day, title } =
      createSessionDto;

    const teacher = await this.validateAndFetchTeacher(teacherId);
    const classEntity = await this.validateAndFetchClass(classId);

    // Check for overlapping sessions
    await this.checkOverlappingSessions(
      teacher,
      classEntity,
      day,
      startTime,
      endTime,
    );

    const session = this.sessionRepository.create({
      title,
      startTime,
      endTime,
      day,
      teacher,
      class: classEntity,
    });

    try {
      const newSession = await this.sessionRepository.save(session);
      return this.sessionTransformToDto(newSession);
    } catch (error) {
      throw new InternalServerErrorException('Error creating session');
    }
  }

  async getAllSessions(): Promise<SessionResponseDto[]> {
    const sessions = await this.sessionRepository.find({
      relations: ['teacher', 'class'],
    });
    return sessions.map((session) => this.sessionTransformToDto(session));
  }

  async getSessionById(id: number): Promise<SessionResponseDto> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['teacher', 'class'],
    });
    if (!session)
      throw new NotFoundException(`Session with ID ${id} not found`);
    return this.sessionTransformToDto(session);
  }

  async updateSession(
    id: number,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SessionResponseDto> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['teacher', 'class'],
    });
    console.log(session);

    if (!session)
      throw new NotFoundException(`Session with ID ${id} not found`);

    const { classId, teacherId, ...otherData } = updateSessionDto;

    if (classId) session.class = await this.validateAndFetchClass(classId);
    if (teacherId)
      session.teacher = await this.validateAndFetchTeacher(teacherId);

    Object.assign(session, _.omitBy(otherData, _.isNil));

    try {
      const updatedSession = await this.sessionRepository.save(session);
      return this.sessionTransformToDto(updatedSession);
    } catch (error) {
      throw new InternalServerErrorException('Error updating session');
    }
  }

  async deleteSession(id: number): Promise<void> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session)
      throw new NotFoundException(`Session with ID ${id} not found`);
    await this.sessionRepository.delete(id);
  }

  private async validateAndFetchTeacher(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher)
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    return teacher;
  }

  private async validateAndFetchClass(id: number): Promise<Class> {
    const classEntity = await this.classRepository.findOne({ where: { id } });
    if (!classEntity)
      throw new NotFoundException(`Class with ID ${id} not found`);
    return classEntity;
  }

  private async checkOverlappingSessions(
    teacher: Teacher,
    classEntity: Class,
    day: DayOfWeek,
    startTime: string,
    endTime: string,
  ): Promise<void> {
    const overlappingClassSession = await this.sessionRepository.findOne({
      where: [
        {
          class: classEntity,
          day,
          startTime: LessThanOrEqual(endTime),
          endTime: MoreThanOrEqual(startTime),
        },
      ],
    });

    if (overlappingClassSession) {
      throw new ConflictException('Overlapping session exists for this class');
    }

    const overlappingTeacherSession = await this.sessionRepository.findOne({
      where: [
        {
          teacher,
          day,
          startTime: LessThanOrEqual(endTime),
          endTime: MoreThanOrEqual(startTime),
        },
      ],
    });

    if (overlappingTeacherSession) {
      throw new ConflictException('Teacher has another overlapping session');
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
