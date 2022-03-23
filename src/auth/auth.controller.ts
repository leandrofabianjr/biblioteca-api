import { Controller, UseGuards, Req, Get, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async signInWithGoogle() {
    return;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async signInWithGoogleRedirect(@Req() req, @Res() res) {
    const jwt = await this.authService.signInWithGoogle(req);
    let url = process.env.APP_URL + '/login';
    if (jwt) {
      url += '?jwt=' + encodeURIComponent(jwt.access_token);
    }
    res.redirect(url);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userdata')
  async getUserData(@Req() req) {
    return this.authService.getUserData(req.user);
  }
}
