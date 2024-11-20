import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSessionDto } from './DTO/create-session.dto';
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
}
