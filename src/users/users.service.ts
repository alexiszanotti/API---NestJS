import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EnconderService } from '../utils/enconder.service';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private encodeService: EnconderService,
    private jwtService: JwtService
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { name, email, password } = registerUserDto;
    const hashedPassword = await this.encodeService.encodePassword(password);
    return this.usersRepository.createUser(name, email, hashedPassword);
  }

  async login(loginDto: LoginDto): Promise<{ accesToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOneByEmail(email);

    if (
      user &&
      (await this.encodeService.checkPassword(password, user.password))
    ) {
      const payload: JwtPayload = {
        email,
        id: user.id,
        isActive: user.isActive
      };
      const accesToken = await this.jwtService.sign(payload);

      return { accesToken };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.getAllUsers();
  }

  async getMyProfile(userId: string): Promise<User> {
    return await this.usersRepository.getMyProfile(userId);
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.getMyProfile(userId);
    const editUser = Object.assign(user, updateUserDto);
    return await this.usersRepository.save(editUser);
  }

  async getUsersActive(): Promise<User[]> {
    const users = await this.usersRepository.getAllUsers();
    const usersActive = users.filter((user) => user.isActive === true);

    if (usersActive.length === 0) {
      throw new UnauthorizedException('No users active');
    }

    return usersActive;
  }
}
