import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassResponseInterceptor } from 'src/interceptors/class-response.interceptor';
import { Class } from './class.entity';
import { ClassService } from './class.service';
import { CreateClassDto } from './DTO/create-class.dto';
import { UpdateClassDto } from './DTO/update-class.dto';

@Controller('class')
@ApiTags('classes')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Class created successfully',
    type: Class,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Grade or Field not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createClass(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return await this.classService.createClass(createClassDto);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'Classes retrieved successfully',
    type: [Class],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(ClassResponseInterceptor)
  async getClasses(): Promise<Class[]> {
    return await this.classService.getClasses();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the class' })
  @ApiResponse({ status: 200, description: 'class retrieved successfully' })
  @ApiResponse({ status: 404, description: 'class not found' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @UseInterceptors(ClassResponseInterceptor)
  async getClassById(@Param('id') id: number): Promise<Class> {
    return await this.classService.getClassById(id);
  }

  @Patch(':id/update')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the class' })
  @ApiResponse({ status: 200, description: 'class updated successfully' })
  @ApiResponse({ status: 404, description: 'class not found' })
  @ApiResponse({ status: 404, description: 'grade not found' })
  @ApiResponse({ status: 404, description: 'field not found' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  async updateClass(
    @Param('id') id: number,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<Class> {
    return await this.classService.updateClass(id, updateClassDto);
  }

  @Delete(':id/delete')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the class' })
  @ApiResponse({ status: 204, description: 'class deleted successfully' })
  @ApiResponse({ status: 404, description: 'class not found' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  async deleteClass(@Param('id') id: number): Promise<void> {
    await this.classService.deleteClass(id);
  }
}
