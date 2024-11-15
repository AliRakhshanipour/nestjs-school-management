import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransformStudentResponseInterceptor } from 'src/interceptors/student-response.interceptor';
import { CreateStudentDto } from './DTO/create-student.dto';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Controller('student')
@ApiTags('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new student with file upload' })
  @ApiConsumes('multipart/form-data', 'json')
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
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(TransformStudentResponseInterceptor) // Apply the interceptor here
  async getAllStudents(): Promise<Student[]> {
    try {
      return await this.studentService.getAllStudents();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error fetching students: ' + error.message,
      );
    }
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
}
