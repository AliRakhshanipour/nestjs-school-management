// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // For password hashing
import { CreateUserDto } from 'src/user/DTO/create-user.dto';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';
import { User } from '../user/user.entity'; // Assuming you have a User entity
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  constructor(
    private userService: UserService, // Inject UserService to access user data
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {
    this.userRepository = new UserRepository(this.dataSource);
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const { username } = payload;
    return await this.userRepository.findOne({ where: { username } });
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.createUser(createUserDto);
    const payload: JwtPayload = { username: user.username };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username: user.username };
      const access_token = this.jwtService.sign(payload);
      return { access_token };
    }
    throw new Error('Invalid credentials');
  }
}
