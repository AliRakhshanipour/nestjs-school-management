import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    default: true,
  })
  isActive: boolean;
}
