import {Body, Controller, Get, Post, ValidationPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './schemas';
import { AuthCredentials } from './dto';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/currentuser')
  getCurrentUser() {
    return this.appService.getUsers();
  }

  @Post('/signup')
  createUser(@Body(ValidationPipe) authCredentials: AuthCredentials): Promise<User> {
    return this.appService.createUser(authCredentials);
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
