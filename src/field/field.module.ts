import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldController } from './field.controller';
import { Field } from './field.entity';
import { FieldRepository } from './field.repository';
import { FieldService } from './field.service';

@Module({
  imports: [TypeOrmModule.forFeature([Field])],
  controllers: [FieldController],
  providers: [FieldService, FieldRepository],
})
export class FieldModule {}
