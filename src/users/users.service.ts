import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'prueba@mail.com',
      password: '123456',
      isActive: false,
      message: [
        {
          id: 1,
          userId: 1,
          content: 'Hola mundo',
        },
      ],
    },
  ];

  //get all users
  getAllUsers(): User[] {
    return this.users;
  }
  //create a new user
  createUser(user: User) {
    this.users.push({
      id: this.users.length + 1,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
    });
  }
}
