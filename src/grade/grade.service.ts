import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateGradeDto } from './DTO/create-grade.dto';
import { GetGradeDto } from './DTO/get-grade.dto';
import { UpdateGradeDto } from './DTO/update-grade.dto';
import { Grade } from './grade.entity';
import { GradeRepository } from './grade.repository';

@Injectable()
export class GradeService {
  private gradeRepository: GradeRepository;
  constructor(private dataSource: DataSource) {
    this.gradeRepository = new GradeRepository(this.dataSource);
  }

  async createGrade(createGradeDto: CreateGradeDto): Promise<Grade> {
    const { title } = createGradeDto;
    return await this.gradeRepository.createGrade(title);
  }

  async getAllGrades(): Promise<Grade[]> {
    return await this.gradeRepository.findAllGrades();
  }

  async getGrade(getGradeDto: GetGradeDto): Promise<Grade> {
    const { id } = getGradeDto;
    const grade = await this.gradeRepository.findGrade(id);
    if (!grade) throw new NotFoundException('no grade found with this id');
    return grade;
  }

  async updateGrade(
    getGradeDto: GetGradeDto,
    updateGradeDto: UpdateGradeDto,
  ): Promise<Grade> {
    const { id } = getGradeDto;
    const { title } = updateGradeDto;
    return this.gradeRepository.updateGrade(id, title);
  }

  async deleteGrade(getGradeDto: GetGradeDto): Promise<void> {
    const { id } = getGradeDto;
    return await this.gradeRepository.deleteGrade(id);
  }
}
