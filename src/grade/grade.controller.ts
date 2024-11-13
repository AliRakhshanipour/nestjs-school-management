import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get(':id')
  async getGrade(@Param('id') id: number): Promise<Grade> {
    return await this.gradeService.getGrade(id);
  }

  @Patch(':id/update')
  async updateGrade(
    @Param('id') id: number,
    @Body('title') title: string,
  ): Promise<Grade> {
    return this.gradeService.updateGrade(id, title);
  }

  @Delete(':id/delete')
  async deleteGrade(@Param('id') id: number): Promise<void> {
    return await this.gradeService.deleteGrade(id);
  }
}
