import { Biometrics } from './biometrics.interface';
import { Role } from './role.enum';

export interface User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  roles?: Role[];
  profilePicture?: string;
  biometrics?: Biometrics;
  metricUnits?: boolean;
}
