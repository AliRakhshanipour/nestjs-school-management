import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../session/session.entity';

export enum RoomCategory {
  THEORY = 'Theory',
  WORKSHOP = 'Workshop',
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  location: string;

  @Column({
    nullable: true,
  })
  number: number;

  @Column({
    type: 'enum',
    enum: RoomCategory,
    default: RoomCategory.THEORY,
  })
  category: RoomCategory;

  @OneToMany(() => Session, (session: Session): Room => session.room, {
    cascade: true,
  })
  sessions: Session[];
}
