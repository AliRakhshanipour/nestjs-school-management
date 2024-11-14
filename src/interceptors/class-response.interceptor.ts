import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ClassResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Check if data is an array (multiple classes) or a single class
        if (Array.isArray(data)) {
          return data.map((classEntity) => {
            return {
              id: classEntity.id,
              title: classEntity.title,
              capacity: classEntity.capacity,
              grade: classEntity.grade?.title, // Get grade title
              field: classEntity.field?.title, // Get field title
            };
          });
        } else {
          return {
            id: data.id,
            title: data.title,
            capacity: data.capacity,
            grade: data.grade?.title,
            field: data.field?.title,
          };
        }
      }),
    );
  }
}
