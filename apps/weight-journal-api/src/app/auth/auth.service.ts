import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@weight-journal-app/domain';
import {
  User as UserClassFromSchema,
  UserDocument,
} from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(UserClassFromSchema.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async signIn(email, pass) {
    try {
      const user = await this.userService.findUserByEmail(email);
      const isPasswordMatch = await bcrypt.compare(pass, user.password);
      if (!isPasswordMatch) {
        throw new UnauthorizedException();
      }
      //Payload is the data that will be encrypted in the JWT
      const payload = {
        _id: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        prefix: user.prefix,
        roles: user.roles,
        profilePicture: user.profilePicture,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw (
        'Error | signIn() | API | auth.service.ts | message: ' + error.message
      );
    }
  }

  async register(user: User): Promise<any> {
    try {
      // lowercase all relevant fields
      user.email = user.email.toLowerCase();
      user.prefix = user.prefix.toLowerCase();
      user.firstName = user.firstName.toLowerCase();
      user.lastName = user.lastName.toLowerCase();

      //Saving user to DB
      const newUser = new this.userModel(user);
      const savedUser = await newUser.save();

      // Exclude password field from the returned user object
      const { password, ...userWithoutPassword } = savedUser.toObject();
      return userWithoutPassword;
    } catch (error) {
      throw (
        'Error | Register() | API | auth.service.ts | message: ' + error.message
      );
    }
  }
}
