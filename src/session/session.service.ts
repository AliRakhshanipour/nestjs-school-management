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
import {
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { CreateSessionDto } from './DTO/create-session.dto';
import { SessionResponseDto } from './DTO/response-session.dto';
import { UpdateSessionDto } from './DTO/update-session.dto';
import { DayOfWeek, Session } from './session.entity';
import { Room } from '../room/room.entity';
import { FilterSessionDto } from './DTO/filter-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async createSession(
    createSessionDto: CreateSessionDto,
  ): Promise<SessionResponseDto> {
    const { teacherId, classId, startTime, endTime, day, title, roomId } =
      createSessionDto;

    const teacher: Teacher = await this.validateAndFetchTeacher(teacherId);
    const classEntity: Class = await this.validateAndFetchClass(classId);
    const room: Room = await this.validateAndFetchRoom(roomId);

    const sessionCount: number = await this.sessionRepository.count({
      where: { room: { id: roomId }, day },
    });

    if (sessionCount >= 4) {
      throw new ConflictException(
        `Room with ID ${roomId} already has the maximum of 4 sessions on ${day}.`,
      );
    }

    const overlappingSession: Session = await this.sessionRepository.findOne({
      where: [
        {
          room: { id: roomId },
          day,
          startTime: LessThanOrEqual(endTime),
          endTime: MoreThanOrEqual(startTime),
        },
      ],
    });

    if (overlappingSession) {
      throw new ConflictException(
        `Room with ID ${roomId} has an overlapping session on ${day} between ${startTime} and ${endTime}.`,
      );
    }

    const session: Session = this.sessionRepository.create({
      title,
      startTime,
      endTime,
      day,
      teacher,
      class: classEntity,
      room,
    });

    try {
      const newSession = await this.sessionRepository.save(session);
      return this.sessionTransformToDto(newSession);
    } catch (error) {
      throw new InternalServerErrorException('Error creating session');
    }
  }

  async getAllSessions(
    filterSessionDto: FilterSessionDto,
  ): Promise<SessionResponseDto[]> {
    const { teacherId, roomId, classId, studentId } = filterSessionDto;

    const queryBuilder: SelectQueryBuilder<Session> = this.sessionRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.teacher', 'teacher')
      .leftJoinAndSelect('session.class', 'class')
      .leftJoinAndSelect('session.room', 'room');

    if (teacherId) {
      queryBuilder.andWhere('teacher.id = :teacherId', { teacherId });
    }

    if (roomId) {
      queryBuilder.andWhere('room.id = :roomId', { roomId });
    }

    if (classId) {
      queryBuilder.andWhere('class.id = :classId', { classId });
    }

    if (studentId) {
      queryBuilder
        .innerJoin('class.students', 'student')
        .andWhere('student.id = :studentId', { studentId });
    }

    const sessions: Session[] = await queryBuilder.getMany();

    return sessions.map(
      (session: Session): SessionResponseDto =>
        this.sessionTransformToDto(session),
    );
  }

  async getSessionById(id: number): Promise<SessionResponseDto> {
    const session: Session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['teacher', 'class', 'room'],
    });
    if (!session)
      throw new NotFoundException(`Session with ID ${id} not found`);
    return this.sessionTransformToDto(session);
  }

  async updateSession(
    id: number,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SessionResponseDto> {
    const session: Session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['teacher', 'class', 'room'],
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

  private async validateAndFetchRoom(id: number): Promise<Room> {
    const room: Room = await this.roomRepository.findOne({ where: { id } });
    if (!room) throw new NotFoundException(`Class with ID ${id} not found`);
    return room;
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
      teacherFullName: session.teacher
        ? `${session.teacher.firstName} ${session.teacher.lastName}`
        : 'Unknown Teacher',
      classTitle: session.class ? session.class.title : 'Unknown Class',
      roomNumber: session.room ? session.room.number : null,
    };
  }
}
