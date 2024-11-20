import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSessionDto } from './DTO/create-session.dto';
import { SessionResponseDto } from './DTO/response-session.dto';
import { Session } from './session.entity';
import { SessionService } from './session.service';

@Controller('session')
@ApiTags('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a session',
    description: 'Creates a new session with specified details.',
  })
  @ApiResponse({
    status: 201,
    description: 'Session created successfully.',
    type: Session,
  })
  @ApiResponse({
    status: 404,
    description: 'Teachers or class not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<Session> {
    return this.sessionService.createSession(createSessionDto);
  }

  @Get('')
  @ApiOperation({
    summary: 'Get all sessions',
    description: 'get all sessions',
  })
  @ApiResponse({
    status: 200,
    description: 'Sessions retrieved successfully.',
    type: Session,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllSessions(): Promise<SessionResponseDto[]> {
    return await this.sessionService.getAllSessions();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Session retrieved successfully.',
    type: Session,
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
    return await this.sessionService.getSessionById(id);
  }

  @ApiResponse({
    status: '2XX',
    description: 'Session deleted successfully.',
    type: Session,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Session not found.',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Internal server error.',
  })
  @Delete(':id/delete')
  async deleteSession(@Param('id') id: number): Promise<void> {
    await this.sessionService.deleteSession(id);
  }
}
