import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from '../field/field.entity';
import { Grade } from '../grade/grade.entity';
import { ClassController } from './class.controller';
import { Class } from './class.entity';
import { ClassService } from './class.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Grade, Field])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
