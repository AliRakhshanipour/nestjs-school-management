import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformStudentResponseInterceptor } from 'src/interceptors/student-response.interceptor';
import { CreateStudentDto } from './DTO/create-student.dto';
import { UpdateStudentDto } from './DTO/update-student.dto';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Controller('student')
@ApiTags('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new student with file upload' })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Student with this national code already exists',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    return await this.studentService.createStudent(createStudentDto);
  }

  @Post(':studentId/assign/:classId')
  @ApiResponse({
    status: 200,
    description: 'Student assigned to class successfully',
  })
  async assignStudentToClass(
    @Param('studentId') studentId: number,
    @Param('classId') classId: number,
  ): Promise<Student> {
    return await this.studentService.assignStudentToClass(studentId, classId);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all students',
    type: [Student],
  })
  @ApiResponse({
    status: 404,
    description: 'No Student Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(TransformStudentResponseInterceptor) // Apply the interceptor here
  async getAllStudents(): Promise<Student[]> {
    return await this.studentService.getAllStudents();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the student' })
  @ApiResponse({ status: '2XX', description: 'student found successfully' })
  @ApiResponse({ status: '4XX', description: 'student not found' })
  @ApiResponse({ status: '5XX', description: 'internal server error' })
  @UseInterceptors(TransformStudentResponseInterceptor)
  async getStudentById(@Param('id') id: number): Promise<Student> {
    const student = await this.studentService.getStudentById(id);

    return student;
  }

  @Patch(':id/update')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the student' })
  @ApiResponse({ status: '2XX', description: 'student updated successfully' })
  @ApiResponse({ status: '4XX', description: 'student not found' })
  @ApiResponse({ status: '5XX', description: 'internal server error' })
  async updateStudent(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return await this.studentService.updateStudent(id, updateStudentDto);
  }

  @Delete(':id/delete')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the student' })
  @ApiResponse({ status: '2XX', description: 'student deleted successfully' })
  @ApiResponse({ status: '4XX', description: 'student not found' })
  @ApiResponse({ status: '5XX', description: 'internal server error' })
  async deleteStudent(@Param('id') id: number): Promise<void> {
    console.log(id);

    return await this.studentService.deleteStudent(id);
  }
}
