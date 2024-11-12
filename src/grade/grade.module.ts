import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeController } from './grade.controller';
import { Grade } from './grade.entity';
import { GradeRepository } from './grade.repository';
import { GradeService } from './grade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])], // Importing TypeORM module for Grade entity
  providers: [GradeService, GradeRepository], // Include GradeRepository in providers
  controllers: [GradeController], // Register controller
})
export class GradeModule {}
