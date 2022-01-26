import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
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
  createUser(@Body() user: User) {
    this.usersService.createUser(user);
    return 'User created successfully';
  }
}
