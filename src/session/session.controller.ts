import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSessionDto } from './DTO/create-session.dto';
import { SessionResponseDto } from './DTO/response-session.dto';
import { UpdateSessionDto } from './DTO/update-session.dto';
import { SessionService } from './session.service';
import { FilterSessionDto } from './DTO/filter-session.dto';

@Controller('sessions')
@ApiTags('Sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new session',
    description: 'Creates a new session with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'Session created successfully.',
    type: SessionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Teacher or class not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Overlapping session detected.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionResponseDto> {
    return this.sessionService.createSession(createSessionDto);
  }

  @Get('')
  @ApiOperation({
    summary: 'Retrieve all sessions',
    description:
      'Fetches a list of all sessions, including teacher and class details.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sessions retrieved successfully.',
    type: [SessionResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllSessions(
    @Query() filterSessionDto: FilterSessionDto,
  ): Promise<SessionResponseDto[]> {
    return await this.sessionService.getAllSessions(filterSessionDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve session by ID',
    description: 'Fetches details of a specific session using its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Session retrieved successfully.',
    type: SessionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Session not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getSessionById(@Param('id') id: number): Promise<SessionResponseDto> {
    return this.sessionService.getSessionById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a session',
    description:
      'Updates the details of a session, such as time, teacher, or class.',
  })
  @ApiResponse({
    status: 200,
    description: 'Session updated successfully.',
    type: SessionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Session, teacher, or class not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Overlapping session detected.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async updateSession(
    @Param('id') id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<SessionResponseDto> {
    return this.sessionService.updateSession(id, updateSessionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a session',
    description:
      'Removes a session by its ID. Deleting a session does not affect the teacher or class.',
  })
  @ApiResponse({
    status: 200,
    description: 'Session deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Session not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async deleteSession(@Param('id') id: number): Promise<void> {
    await this.sessionService.deleteSession(id);
  }
}
