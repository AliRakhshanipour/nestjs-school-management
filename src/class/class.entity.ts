import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '../field/field.entity';
import { Grade } from '../grade/grade.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  // Many classes belong to one grade
  @ManyToOne(() => Grade, (grade) => grade.classes)
  grade: Grade;

  // Many classes belong to one field
  @ManyToOne(() => Field, (field) => field.classes)
  field: Field;

  @Column({ default: 30 })
  capacity: number;
}
