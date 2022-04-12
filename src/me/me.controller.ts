import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiExceptionFilter } from 'src/commons/filters/api-exception.filter';
import { MeService } from './me.service';

@Controller('me')
@UseFilters(ApiExceptionFilter)
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(private meService: MeService) {}

  @Get('stats')
  async stats(@Req() req, @Res() res) {
    const stats = await this.meService.getStats(req.user);
    res.json(stats);
  }
}
