import { ApiProperty } from '@nestjs/swagger';

export class SessionResponseDto {
  @ApiProperty({ description: 'Session ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Session Title', example: 'Mathematics Class' })
  title: string;

  @ApiProperty({ description: 'Start Time of the Session', example: '10:00' })
  startTime: string;

  @ApiProperty({ description: 'End Time of the Session', example: '12:00' })
  endTime: string;

  @ApiProperty({ description: 'Day of the Week', example: 'Monday' })
  day: string;

  @ApiProperty({
    description: 'Teacher Full Name',
    example: 'علیرضا رخشانی پور',
  })
  teacherFullName: string;

  @ApiProperty({ description: 'Class Title', example: '103' })
  classTitle: string;

  @ApiProperty({ description: 'Room number', example: 12 })
  roomNumber?: number;
}
