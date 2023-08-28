import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/user.service';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { registerDto } from './dto/auth.register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    try {
      const isDBEmpty = await this.usersService.checkIsDBEmpty();

      if (isDBEmpty) {
        throw new HttpException(
          'Contact your administrator',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        throw new HttpException(
          'Invalid Email or Password',
          HttpStatus.BAD_REQUEST,
        );
      }

      const match = await bcrypt.compare(pass, user.password);

      if (!match) {
        throw new HttpException(
          'Invalid Email or Password',
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = { email: user.email, sub: user.id, role: user.role.name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async register(register: registerDto): Promise<User> {
    return await this.usersService.createAdmin(register);
  }
}
