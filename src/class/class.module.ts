import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from 'src/field/field.entity';
import { Grade } from 'src/grade/grade.entity';
import { ClassController } from './class.controller';
import { Class } from './class.entity';
import { ClassRepository } from './class.repository'; // Assuming you have a ClassRepository
import { ClassService } from './class.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Field, Grade])],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository], // Ensure ClassRepository is included here
  exports: [ClassRepository], // Export ClassRepository so it can be used in other modules
})
export class ClassModule {}
