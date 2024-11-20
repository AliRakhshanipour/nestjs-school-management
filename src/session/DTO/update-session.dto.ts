import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateSessionDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startsAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endsAt?: Date;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  teacherIds?: number[];

  @IsOptional()
  @IsNumber()
  classId?: number;
}
