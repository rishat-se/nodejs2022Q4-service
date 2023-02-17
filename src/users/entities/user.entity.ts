import { Type } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;
  password: string;
  version?: number; // integer number, increments on update
  @Type(() => Number)
  createdAt?: number; // timestamp of creation
  @Type(() => Number)
  updatedAt?: number; // timestamp of last update
}
