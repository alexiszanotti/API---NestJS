import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Juan',
      email: 'prueba@mail.com',
      password: '123456',
      isActive: false,
    },
  ];

  //get all users
  getAllUsers(): User[] {
    return this.users;
  }
  //create a new user
  createUser(user: CreateUserDto) {
    this.users.push({
      id: this.users.length + 1,
      name: user.name,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
    });
  }
}
