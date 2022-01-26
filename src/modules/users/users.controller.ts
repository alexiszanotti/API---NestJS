import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { User } from '../../auth/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get All users
  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }

  //crate a new user
  @Post()
  createUser(@Body() user: CreateUserDto) {
    if (!user.email || !user.password) {
      return 'Email and password are required';
    } else {
      this.usersService.createUser(user);
      return 'User created successfully';
    }
  }
}
