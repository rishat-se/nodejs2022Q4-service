import { User } from '../entities/user.entity';
import { UsersDb } from '../interfaces/users-db.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserDb implements UsersDb {
  private users: User[];

  constructor() {
    this.users = [];
  }

  // private users: User[] = [
  //   {
  //     id: '390eeca6-1ae1-45ea-9cdb-71065b110825',
  //     login: 'john',
  //     password: 'ajshnenw',
  //     version: 0,
  //     createdAt: 111111111,
  //     updatedAt: 222222222,
  //   },
  // ];

  create(user: User) {
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((item) => item.id === id);
  }

  update(user: User) {
    const idx = this.users.findIndex((item) => item.id === user.id);
    if (idx === -1) throw new Error('Not found');
    this.users.splice(idx, 1, user);
  }

  remove(id: string) {
    const idx = this.users.findIndex((item) => item.id === id);
    if (idx === -1) throw new Error('Not found');
    this.users.splice(idx, 1);
  }
}
