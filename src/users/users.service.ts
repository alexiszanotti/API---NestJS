import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { EnconderService } from './enconder.service';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private encodeService: EnconderService,
    private jwtService: JwtService,
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
        isActive: user.isActive,
      };
      const accesToken = await this.jwtService.sign(payload);

      return { accesToken };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
