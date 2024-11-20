import { Teacher } from '../teacher.entity';

export interface GetAllTeachersResponse {
  teachers: Teacher[];
  teacherCount: number;
}
