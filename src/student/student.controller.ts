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

/**
 * Controller for managing student-related operations.
 */
@Controller('student')
@ApiTags('students') // Swagger tag to group student-related endpoints
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  /**
   * Create a new student.
   * @param createStudentDto - Data Transfer Object for creating a student.
   * @returns The created student.
   */
  @Post('create')
  @ApiOperation({ summary: 'Create a new student' })
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

  /**
   * Assign a student to a class.
   * @param studentId - ID of the student.
   * @param classId - ID of the class.
   * @returns The updated student with the class assignment.
   */
  @Post(':studentId/assign/:classId')
  @ApiOperation({ summary: 'Assign a student to a class' })
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

  /**
   * Retrieve all students.
   * Uses a custom response interceptor to transform data.
   * @returns A list of all students.
   */
  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all students',
    type: [Student],
  })
  @ApiResponse({ status: 404, description: 'No students found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(TransformStudentResponseInterceptor) // Custom response formatting
  async getAllStudents(): Promise<Student[]> {
    return await this.studentService.getAllStudents();
  }

  /**
   * Retrieve a student by ID.
   * Uses a custom response interceptor to transform data.
   * @param id - ID of the student.
   * @returns The student details.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the student' })
  @ApiResponse({ status: 200, description: 'Student found successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(TransformStudentResponseInterceptor)
  async getStudentById(@Param('id') id: number): Promise<Student> {
    return await this.studentService.getStudentById(id);
  }

  /**
   * Update student details by ID.
   * @param id - ID of the student.
   * @param updateStudentDto - Data Transfer Object for updating a student.
   * @returns The updated student.
   */
  @Patch(':id/update')
  @ApiOperation({ summary: 'Update a student by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the student' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateStudent(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return await this.studentService.updateStudent(id, updateStudentDto);
  }

  /**
   * Delete a student by ID.
   * @param id - ID of the student.
   */
  @Delete(':id/delete')
  @ApiOperation({ summary: 'Delete a student by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the student' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteStudent(@Param('id') id: number): Promise<void> {
    return await this.studentService.deleteStudent(id);
  }
}
