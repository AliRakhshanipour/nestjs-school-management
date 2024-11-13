import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFieldDto } from './DTO/create-field.dto';
import { UpdateFieldDto } from './DTO/update-field.dto';
import { Field } from './field.entity';
import { FieldService } from './field.service';

@Controller('field')
@ApiTags('fields')
export class FieldController {
  constructor(private fieldService: FieldService) {}

  @Post('create')
  @ApiResponse({ status: 201, description: 'field creted successfully' })
  @ApiResponse({ status: 400, description: 'bad request' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  async createField(@Body() createFieldDto: CreateFieldDto): Promise<Field> {
    return await this.fieldService.createField(createFieldDto);
  }

  @Get('')
  @ApiResponse({ status: 500, description: 'internal server error' })
  async getFields(): Promise<Field[]> {
    return this.fieldService.getFields();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'field fetched successfully' })
  @ApiResponse({ status: 404, description: 'field not found' })
  @ApiResponse({ status: 400, description: 'bad request' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  async getFieldById(@Param('id') id: number): Promise<Field> {
    return await this.fieldService.getFieldById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the field to update',
  })
  @ApiResponse({ status: 200, description: 'Field updated successfully' })
  @ApiResponse({ status: 404, description: 'No field found with this ID' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateField(
    @Param('id') id: number,
    @Body() updateFieldDto: UpdateFieldDto,
  ): Promise<Field> {
    return await this.fieldService.updateField(id, updateFieldDto);
  }
}
