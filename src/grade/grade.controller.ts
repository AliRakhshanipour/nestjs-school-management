import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGradeDto } from './DTO/create-grade.dto';
import { GetGradeDto } from './DTO/get-grade.dto';
import { UpdateGradeDto } from './DTO/update-grade.dto';
import { Grade } from './grade.entity';
import { GradeService } from './grade.service';

@Controller('grade')
@ApiTags('Grades')
export class GradeController {
  constructor(private gradeService: GradeService) {}

  @Post('create')
  @ApiResponse({ status: 201, description: 'Grade created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createGrade(@Body() createGradeDto: CreateGradeDto): Promise<Grade> {
    return await this.gradeService.createGrade(createGradeDto);
  }

  @Get('')
  @ApiResponse({ status: 200, description: 'Grades fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllGrades(): Promise<Grade[]> {
    return await this.gradeService.getAllGrades();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'ID of the grade' })
  @ApiResponse({ status: 200, description: 'Grade fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getGrade(@Param() getGradeDto: GetGradeDto): Promise<Grade> {
    return await this.gradeService.getGrade(getGradeDto);
  }

  @Patch(':id/update')
  @ApiParam({ name: 'id', type: String, description: 'ID of the grade' })
  @ApiResponse({ status: 200, description: 'Grade updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateGrade(
    @Param() getGradeDto: GetGradeDto,
    @Body() updateGradeDto: UpdateGradeDto,
  ): Promise<Grade> {
    return this.gradeService.updateGrade(getGradeDto, updateGradeDto);
  }

  @Delete(':id/delete')
  @ApiParam({ name: 'id', type: String, description: 'ID of the grade' })
  @ApiResponse({ status: 200, description: 'Grade deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteGrade(@Param() getGradeDto: GetGradeDto): Promise<void> {
    return await this.gradeService.deleteGrade(getGradeDto);
  }
}
