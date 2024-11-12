import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Grade } from './grade.entity';

@Injectable()
export class GradeRepository extends Repository<Grade> {
  private readonly logger = new Logger(GradeRepository.name);

  constructor(private dataSource: DataSource) {
    super(Grade, dataSource.createEntityManager());
  }

  async createGrade(title: string): Promise<Grade> {
    try {
      const grade = this.create({ title });
      // We expect this.save() to either return a valid object or throw an error if something goes wrong.
      return await this.save(grade);
    } catch (error) {
      this.logger.error(
        `Failed to create grade: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'An error occurred while creating the grade',
      );
    }
  }

  async findAllGrades(): Promise<Grade[]> {
    try {
      return await this.find();
    } catch (error) {
      this.logger.error(
        `Failed to retrieve grades: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'An error occurred while retrieving grades',
      );
    }
  }

  async updateGrade(id: number, title: string): Promise<Grade> {
    try {
      const grade = await this.findOne({ where: { id } });
      if (!grade) {
        throw new BadRequestException('Grade not found');
      }

      grade.title = title;
      return await this.save(grade);
    } catch (error) {
      this.logger.error(
        `Failed to update grade with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'An error occurred while updating the grade',
      );
    }
  }

  async deleteGrade(id: number): Promise<void> {
    try {
      const result = await this.delete(id);
      if (result.affected === 0) {
        throw new BadRequestException('Grade not found or deletion failed');
      }
    } catch (error) {
      this.logger.error(
        `Failed to delete grade with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'An error occurred while deleting the grade',
      );
    }
  }
}
