import {
  Injectable,
  BadRequestException,
  // ForbiddenException,
} from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';
// import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async token(user: User) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async signInWithGoogle(data) {
    if (!data.user) throw new BadRequestException();

    try {
      const newUser = {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        googleId: data.user.id,
      };

      // await this.usersService.store(newUser);
      return this.token(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserData(user: any) {
    const token = await this.token(user);
    return { user, token };
  }
}
