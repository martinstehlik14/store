import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(new ValidationPipe({ transform: true })) dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body(new ValidationPipe({ transform: true })) dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: { user: { id: string; email: string; role: string } }) {
    return req.user;
  }
}