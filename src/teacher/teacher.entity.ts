import { Session } from 'src/session/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  personalCode: string;

  @Column({ unique: true })
  nationalCode: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Session, (session) => session.teacher, {
    cascade: false, // Do not cascade delete for sessions when Teacher is deleted
  })
  sessions: Session[];

  @Column({
    default: true,
  })
  isActive: boolean;
}
