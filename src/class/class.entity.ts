import { Expose } from 'class-transformer';
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

  @ManyToOne(() => Grade, (grade) => grade.classes)
  @Expose()
  grade: Grade;

  @ManyToOne(() => Field, (field) => field.classes)
  @Expose()
  field: Field;

  @Column({ default: 30 })
  capacity: number;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
