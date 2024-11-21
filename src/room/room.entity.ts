import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
