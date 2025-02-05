import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Hash } from 'src/utils/password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ where: { isActive: true } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = await Hash.password(createUserDto.password);
    user.createdAt = new Date().getTime();

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email, isActive: true },
    });

    if (user) {
      return user;
    }

    return undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id, isActive: true },
    });

    if (user) {
      return user;
    }

    return undefined;
  }

  async update(
    id: number,
    updateUserDto: Partial<User>,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id, isActive: true },
    });

    if (user) {
      Object.assign(user, updateUserDto);
      return this.usersRepository.save(user);
    }

    return undefined;
  }
}
