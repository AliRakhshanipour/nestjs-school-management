import { Teacher } from '../teache.entity';

export interface GetAllTeachersResponse {
  teachers: Teacher[];
  teacherCount: number;
}
