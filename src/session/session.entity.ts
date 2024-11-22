import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../class/class.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Room } from '../room/room.entity';

// Define the enum for days of the week
export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'time' }) // Use TIME data type
  startTime: string;

  @Column({ type: 'time' }) // Use TIME data type
  endTime: string;

  @Column({
    type: 'enum',
    enum: DayOfWeek,
  })
  day: DayOfWeek;

  @ManyToOne(() => Teacher, (teacher: Teacher): Session[] => teacher.sessions, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  teacher: Teacher;

  @ManyToOne(
    () => Class,
    (classEntity: Class): Session[] => classEntity.sessions,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  class: Class;

  @ManyToOne(() => Room, (room: Room): Session[] => room.sessions, {
    nullable: true,
  })
  room: Room;
}
