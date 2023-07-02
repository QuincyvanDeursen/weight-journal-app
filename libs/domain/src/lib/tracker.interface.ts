import { Measurement } from './measurement.interface';

//make other trackers extend from this
export interface Tracker {
  _id?: string;
  userId: string;
  startDate: Date;
  measurements: Measurement[];
}
