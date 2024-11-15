import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentResponse } from '../student/interface/student-response.interface';

@Injectable()
export class TransformStudentResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          // Handle the case where data is an array of students
          return data.map((student) => this.transformStudent(student));
        }

        // Handle the case where data is a single student
        return this.transformStudent(data);
      }),
    );
  }

  private transformStudent(student: any): StudentResponse {
    return {
      firstName: student.firstName,
      lastName: student.lastName,
      fatherName: student.fatherName,
      nationalCode: student.nationalCode,
      phoneNumber: student.phoneNumber,
      emgPhoneNumber: student.emgPhoneNumber,
      dateOfBirth: student.dateOfBirth,
      address: student.address,
      isActive: student.isActive,
      // Only include class title or null if class is not assigned
      class: student.class ? student.class.title : null,
    };
  }
}
