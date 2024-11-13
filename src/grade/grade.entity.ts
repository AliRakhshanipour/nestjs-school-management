import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../class/class.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // A grade can have many classes
  @OneToMany(() => Class, (classEntity) => classEntity.grade)
  classes: Class[];
}
