import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeacherDto } from './DTO/create-teacher.dto';
import { UpdateTeacherDto } from './DTO/update-teacher.dto';
import { GetAllTeachersResponse } from './interfaces/get-teachers.interface';
import { Teacher } from './teache.entity';
import { TeacherService } from './teacher.service';

@Controller('teacher')
@ApiTags('teachers')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post('create')
  @ApiOperation({ description: 'create ne teacher' })
  @ApiResponse({ status: 201, description: 'teacher created successfully' })
  @ApiResponse({
    status: 409,
    description: 'personal code or national code already exist',
  })
  @ApiResponse({ status: 500, description: 'internal server error' })
  async createTeacher(
    @Body() createTeacherDto: CreateTeacherDto,
  ): Promise<Teacher> {
    return await this.teacherService.createTeacher(createTeacherDto);
  }

  @Get('')
  @ApiOperation({ description: 'get all teachers and number' })
  @ApiResponse({ status: 200, description: 'teachers retrieved successfully' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  async getAllTeachers(): Promise<GetAllTeachersResponse> {
    return await this.teacherService.getAllTeachers();
  }

  @Get(':id')
  @ApiOperation({ description: 'get teacher by id' })
  @ApiResponse({ status: 200, description: 'teacher retrieved successfully' })
  @ApiResponse({ status: 404, description: 'teacher not found' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  async getTeacherById(@Param('id') id: number): Promise<Teacher> {
    return await this.teacherService.getTeacherById(id);
  }

  @Patch(':id/update')
  @ApiOperation({ description: 'update teacher by id' })
  @ApiResponse({ status: '2XX', description: 'teacher updated successfully' })
  @ApiResponse({ status: '4XX', description: 'teacher not found' })
  @ApiResponse({ status: '5XX', description: 'internal server error' })
  async updateTeacher(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return await this.teacherService.updateTeacher(id, updateTeacherDto);
  }

  @Delete(':id/delete')
  @ApiOperation({ description: 'delete teacher by id' })
  @ApiResponse({ status: '2XX', description: 'teacher deleted successfully' })
  @ApiResponse({ status: '4XX', description: 'teacher not found' })
  @ApiResponse({ status: '5XX', description: 'internal server error' })
  async deleteTeacher(@Param('id') id: number): Promise<void> {
    await this.teacherService.deleteTeacher(id);
  }
}
