import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User as UserClassFromSchema,
  UserDocument,
} from '../schemas/user.schema';
import { Model } from 'mongoose';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserClassFromSchema.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  //////////////////////////////////////////////////////
  //////////////         GET             ///////////////
  //////////////////////////////////////////////////////

  async findUserById(id: string): Promise<any> {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<any> {
    const lowerCaseEmail = email.toLowerCase();
    const user = await this.userModel.findOne({ email: lowerCaseEmail }).lean();
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  //////////////////////////////////////////////////////
  //////////////         POST            ///////////////
  //////////////////////////////////////////////////////
}
