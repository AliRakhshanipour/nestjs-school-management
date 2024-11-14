import { ApiProperty } from '@nestjs/swagger';

export class UpdateClassDto {
  @ApiProperty({ name: 'title', description: 'class title' })
  title?: string;
  @ApiProperty({ name: 'gradeId', description: 'class grade' })
  gradeId?: number;
  @ApiProperty({ name: 'fieldId', description: 'class field' })
  fieldId?: number;
  @ApiProperty({ name: 'capacity', description: 'class capacity' })
  capacity?: number;
}
