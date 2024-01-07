import {
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const user = this.create({ name, email, password });
    try {
      await this.save(user);
    } catch (e) {
      console.log(e);
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async getMyProfile(userId: string): Promise<User> {
    return await this.findOne(userId);
  }

  async updateUser(userId: User): Promise<void> {
    const user = await this.findOne(userId);
    await this.save(user);
  }
}
