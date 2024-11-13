import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponseDto } from './DTO/create-user.dto';
import { GetUserById } from './DTO/get-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new grade' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    try {
      const user = await this.userService.createUser(createUserDto);

      const result = {
        message: 'user created successfully',
        user,
      };
      return result;
    } catch (error) {
      throw new Error('error in creation user');
    }
  }

  @Get('')
  async getUsers(): Promise<User[]> {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/:id')
  async getUser(@Param() getUserById: GetUserById): Promise<User> {
    try {
      return this.userService.getUser(getUserById);
    } catch (error) {
      throw new InternalServerErrorException('internal server error');
    }
  }
}
