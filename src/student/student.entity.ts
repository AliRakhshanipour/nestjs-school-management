import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../class/class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fatherName: string;

  @Column({ unique: true })
  nationalCode: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  emgPhoneNumber: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Class, (classEntity) => classEntity.students, {
    nullable: true,
  })
  class: Class;
}
