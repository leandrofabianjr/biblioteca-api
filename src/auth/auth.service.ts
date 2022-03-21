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

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) return user;
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async signInWithGoogle(data) {
    if (!data.user) throw new BadRequestException();

    // let user = (
    //   await this.usersService.findBy({ where: [{ googleId: data.user.id }] })
    // )[0];
    // if (user) return this.login(user);

    // user = (
    //   await this.usersService.findBy({ where: [{ email: data.user.email }] })
    // )[0];
    // if (user)
    //   throw new ForbiddenException(
    //     "User already exists, but Google account was not connected to user's account",
    //   );

    try {
      const newUser = {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        googleId: data.user.id,
      };

      // await this.usersService.store(newUser);
      return this.login(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }
}
