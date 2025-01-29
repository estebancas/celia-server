import { Body, Controller, Get, Post } from '@nestjs/common';

// import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserDto } from './dto/cv-create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
// import { DtoValidationPipe } from 'src/core/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
