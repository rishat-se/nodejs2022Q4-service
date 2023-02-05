import { Album } from '../entities/album.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryAlbumsDB {
  private albums: Album[];

  constructor() {
    this.albums = [];
  }

  create(album: Album) {
    this.albums.push(album);
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    return this.albums.find((item) => item.id === id);
  }

  update(album: Album) {
    const idx = this.albums.findIndex((item) => item.id === album.id);
    if (idx === -1) throw new Error('entity not found');
    this.albums.splice(idx, 1, album);
  }

  remove(id: string) {
    const idx = this.albums.findIndex((item) => item.id === id);
    if (idx === -1) throw new Error('entity not found');
    this.albums.splice(idx, 1);
  }
}
