import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeacherDto } from './DTO/create-teacher.dto';
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
}
