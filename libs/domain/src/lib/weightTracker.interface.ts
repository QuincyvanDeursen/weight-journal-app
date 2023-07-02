import { Tracker } from './Tracker.interface';

export interface WeightTracker extends Tracker {
  goalDate?: Date;
  goal?: number;
  image?: string;
  unit: string;
}
