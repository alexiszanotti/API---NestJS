import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './users.service';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ accesToken: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/all')
  getAll(): Promise<any> {
    return this.authService.getAllUsers();
  }

  @Get(':userId')
  getMyProfile(@Param('userId') userId: string): Promise<any> {
    return this.authService.getMyProfile(userId);
  }
}
