import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../class/class.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // A field can have many classes
  @OneToMany(() => Class, (classEntity) => classEntity.field)
  classes: Class[];
}
