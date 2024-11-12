import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './DTO/create-user.dto';
import { GetUserById } from './DTO/get-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
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
