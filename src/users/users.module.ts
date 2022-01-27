import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './users.controller';
import { AuthService } from './users.service';
import { UsersRepository } from './users.repository';
import { EnconderService } from './enconder.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, EnconderService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
