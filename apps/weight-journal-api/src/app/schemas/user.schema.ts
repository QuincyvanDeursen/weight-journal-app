import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Role } from '@weight-journal-app/domain';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  Biometrics as BiometricClassFromSchema,
  Biometrics,
} from './biometrics.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        // Check if the value matches the email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address',
    },
  })
  email: string;

  @Prop({
    required: true,
    validate: {
      validator: (value: string) => {
        // Check if the value matches the password format
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[a-zA-Z\d\W]{8,}$/.test(
          value
        );
      },
      message:
        'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and a minimum of 8 characters in length',
    },
  })
  password: string;

  @Prop({
    required: true,
    validate: {
      validator: (value: string) => {
        // Check if the value contains letters only
        return /^[a-zA-Z]+$/.test(value);
      },
      message: 'First name should contain only letters',
    },
  })
  firstName: string;

  @Prop({
    required: true,
    validate: {
      validator: (value: string) => {
        // Check if the value contains letters only
        return /^[a-zA-Z ]+$/.test(value);
      },
      message: 'Last name should contain only letters',
    },
  })
  lastName: string;

  @Prop({
    required: false,
    validate: {
      validator: (value: string) => {
        // Check if the value contains letters only
        return /^[a-zA-Z ]+$/.test(value);
      },
      message: 'prefix should contain only letters',
    },
  })
  prefix: string;

  @Prop({ required: true })
  gender: Gender;

  @Prop({ required: true })
  roles: Role[];

  @Prop({ required: true })
  metricUnits: boolean;

  @Prop({ required: false })
  profilePicture: string;

  @Prop({
    required: false,
    ref: BiometricClassFromSchema.name,
  })
  biometrics: Biometrics;
}

export const UserSchema = SchemaFactory.createForClass(User);

//pre save hook to hash the password
UserSchema.pre<User>('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
});
