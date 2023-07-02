export interface Tracker {
  _id?: string;
  userId: string;
  startDate: Date;
  goalDate?: Date;
  goal?: number;
  image?: string;
}
