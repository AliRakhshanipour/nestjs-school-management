import { Expose } from 'class-transformer';
import { Class } from 'src/class/class.entity';

export class StudentDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  fatherName: string;

  @Expose()
  nationalCode: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  emgPhoneNumber: string;

  @Expose()
  dateOfBirth: Date;

  @Expose()
  address: string;

  @Expose()
  isActive: boolean;

  @Expose()
  class: Class;
}
