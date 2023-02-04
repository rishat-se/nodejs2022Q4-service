import { User } from '../entities/user.entity';

export interface UsersDb {
  findAll: () => User[];
}
