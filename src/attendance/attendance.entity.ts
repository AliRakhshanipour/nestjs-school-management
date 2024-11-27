import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../session/session.entity';
import { Student } from '../student/student.entity';

export enum AttendanceStatus {
  ABSENT = 'ABSENT',
  PRESENT = 'PRESENT',
  DELAY = 'DELAY', // I assume DELAY means late?
}

@Entity()
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
  })
  status: AttendanceStatus;

  @ManyToOne(() => Session, (session) => session.attendances, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  session: Session;

  @ManyToOne(() => Student, (student) => student.attendances, {
    nullable: false,
  })
  student: Student;
}
