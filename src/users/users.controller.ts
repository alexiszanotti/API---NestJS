import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/users.entity';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.userService.registerUser(registerUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ accesToken: string }> {
    return this.userService.login(loginDto);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/active')
  getActive(): Promise<User[]> {
    return this.userService.getUsersActive();
  }

  @Get(':userId')
  getMyProfile(@Param('userId') userId: string): Promise<User> {
    return this.userService.getMyProfile(userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
