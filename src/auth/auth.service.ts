import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async token(user: User) {
    return {
      access_token: this.jwtService.sign({
        sub: user.uuid,
        email: user.email,
      }),
    };
  }

  async signInWithGoogle(data: { user?: CreateUserDto }) {
    const userData = data?.user;

    if (!userData) throw new BadRequestException();

    const user =
      (await this.usersService.findOneByEmail(userData.email)) ?? new User();

    user.email = userData.email;
    user.google_uid = userData.google_uid;
    user.name = userData.name;
    user.profile_picture_url = userData.profile_picture_url;

    await this.usersService.save(user);

    return this.token(user);
  }

  async getUserData(user: any) {
    const token = await this.token(user);
    return { user, token };
  }
}
