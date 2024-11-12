import { Body, Controller, Get, Post } from '@nestjs/common';
import { Grade } from './grade.entity';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
  constructor(private gradeService: GradeService) {}

  @Post('create')
  async createGrade(@Body('title') title: string): Promise<Grade> {
    return await this.gradeService.createGrade(title);
  }

  @Get('')
  async getAllGrades(): Promise<Grade[]> {
    return await this.gradeService.getAllGrades();
  }
}
