import { Expose } from 'class-transformer';
import { Session } from 'src/session/session.entity';
import { Student } from 'src/student/student.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field } from '../field/field.entity';
import { Grade } from '../grade/grade.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToOne(() => Grade, (grade: Grade): Class[] => grade.classes)
  @Expose()
  grade: Grade;

  @ManyToOne(() => Field, (field: Field): Class[] => field.classes)
  @Expose()
  field: Field;

  @Column({ default: 30 })
  capacity: number;

  @OneToMany(() => Student, (student: Student): Class => student.class)
  students: Student[];

  @OneToMany(() => Session, (session: Session): Class => session.class, {
    cascade: false,
  })
  sessions: Session[];
}
