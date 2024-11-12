import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './DTO/create-user.dto';
import { GetUserById } from './DTO/get-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private userRepository: UserRepository;

  constructor(private dataSource: DataSource) {
    this.userRepository = new UserRepository(this.dataSource);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(getUserById: GetUserById): Promise<User> {
    const { id } = getUserById;
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user)
      throw new NotFoundException(`user not found with this id: ${id}`);
    return user;
  }
}
