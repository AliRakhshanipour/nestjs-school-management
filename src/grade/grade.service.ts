import { Injectable } from '@nestjs/common';
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
}
