import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Field } from './field.entity';
import { FieldService } from './field.service';

@Controller('field')
export class FieldController {
  constructor(private fieldService: FieldService) {}

  @Post('create')
  async createField(@Body('title') title: string): Promise<Field> {
    return await this.fieldService.createField(title);
  }

  @Get('')
  async getFields(): Promise<Field[]> {
    return this.fieldService.getFields();
  }

  @Get(':id')
  async getFieldById(@Param('id') id: number): Promise<Field> {
    return await this.fieldService.getFieldById(id);
  }

  @Patch(':id/update')
  async updateField(
    @Param('id') id: number,
    @Body('title') title: string,
  ): Promise<Field> {
    return await this.fieldService.updateField(id, title);
  }
}
