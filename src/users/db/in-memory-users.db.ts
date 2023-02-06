import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUsersDB {
  private users: User[];

  constructor() {
    this.users = [];
  }

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
    if (idx === -1) throw new Error('entity not found');
    this.users.splice(idx, 1, user);
  }

  remove(id: string) {
    const idx = this.users.findIndex((item) => item.id === id);
    if (idx === -1) throw new Error('entity not found');
    this.users.splice(idx, 1);
  }
}
