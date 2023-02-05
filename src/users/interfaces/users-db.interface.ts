import { User } from '../entities/user.entity';

export interface UsersDB {
  create(user: User): void;
  findAll(): User[];
  findOne(id: string): User | undefined;
  update(user: User): void;
  remove(id: string): void;
}
