import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto';
import { User } from './schemas';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/currentuser')
  getCurrentUser() {
    return this.authService.getUsers();
  }

  @Post('/signup')
  createUser(
    @Body(ValidationPipe) authCredentials: AuthCredentials,
  ): Promise<User> {
    return this.authService.createUser(authCredentials);
  }

  @Post('/signin')
  login(): string {
    return '';
  }

  @Post('/signout')
  logout(): string {
    return '';
  }
}
