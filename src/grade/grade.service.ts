import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Grade } from './grade.entity';
import { GradeRepository } from './grade.repository';

@Injectable()
export class GradeService {
  private gradeRepository: GradeRepository;
  constructor(private dataSource: DataSource) {
    this.gradeRepository = new GradeRepository(this.dataSource);
  }

  async createGrade(title: string): Promise<Grade> {
    return await this.gradeRepository.createGrade(title);
  }

  async getAllGrades(): Promise<Grade[]> {
    return await this.gradeRepository.findAllGrades();
  }

  async getGrade(id: number): Promise<Grade> {
    const grade = await this.gradeRepository.findGrade(id);
    if (!grade) throw new NotFoundException('no grade found with this id');
    return grade;
  }

  async updateGrade(id: number, title: string): Promise<Grade> {
    return this.gradeRepository.updateGrade(id, title);
  }

  async deleteGrade(id: number): Promise<void> {
    return await this.gradeRepository.deleteGrade(id);
  }
}
