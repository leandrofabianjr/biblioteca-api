// https://blog.dominikwawrzynczak.pl/2020/08/oauth-with-nestjs-application-sign-in-with-google/
// https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { CreateUserDto } from 'src/users/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.URL + '/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const userData: CreateUserDto = {
      google_uid: id,
      email: emails[0].value,
      name: displayName,
      profile_picture_url: photos[0]?.value,
    };
    done(null, userData);
  }
}
