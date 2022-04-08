import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import { AuthCredentials } from './dto';
import { isExistEntityError } from './utils';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}
  async getUsers(filter = {}) {
    const users = await this.userModel.find(filter);

    return users
  }

  async createUser(authCredentials: AuthCredentials): Promise<User> {
    try {
      const user = await this.userModel.create(authCredentials);
      return user;
    } catch (error) {
      throw isExistEntityError ? new ConflictException('This user already exists'): error
    }
  }
}
