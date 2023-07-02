import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BiometricsDocument = HydratedDocument<Biometrics>;

@Schema({ timestamps: true })
export class Biometrics {
  @Prop({
    required: true,
    validate: {
      validator: function (height: string) {
        const numericHeight = parseFloat(height);
        return numericHeight >= 0 && numericHeight <= 300;
      },
      message: 'Height must be between 0 and 300.',
    },
  })
  height: string;

  @Prop({
    required: true,
    validate: {
      validator: function (weight: string) {
        const numericWeight = parseFloat(weight);
        return numericWeight >= 0 && numericWeight <= 1000;
      },
      message: 'Weight must be between 0 and 1000.',
    },
  })
  weight: string;

  @Prop({
    required: true,
    validate: {
      validator: function (birthdate: Date) {
        const currentDate = new Date();
        const minDate = new Date('1920-01-01');
        return birthdate <= currentDate && birthdate >= minDate;
      },
      message: 'Birthdate cant be a future date or before the year 1920.',
    },
  })
  birthdate: Date;

  @Prop({
    required: false,
    default: 0.0,
  })
  PAL: string;

  @Prop({
    required: false,
    default: 0.0,
  })
  BMR: string;

  @Prop({
    required: false,
    default: 0.0,
  })
  BMI: string;

  @Prop({
    required: false,
    default: 0,
  })
  TDEE: string;
}

export const biometricsSchema = SchemaFactory.createForClass(Biometrics);
