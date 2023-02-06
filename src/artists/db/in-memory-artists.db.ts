import { Artist } from '../entities/artist.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryArtistsDB {
  private artists: Artist[];

  constructor() {
    this.artists = [];
  }

  create(artist: Artist) {
    this.artists.push(artist);
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((item) => item.id === id);
  }

  update(artist: Artist) {
    const idx = this.artists.findIndex((item) => item.id === artist.id);
    if (idx === -1) throw new Error('entity not found');
    this.artists.splice(idx, 1, artist);
  }

  remove(id: string) {
    const idx = this.artists.findIndex((item) => item.id === id);
    if (idx === -1) throw new Error('entity not found');
    this.artists.splice(idx, 1);
  }
}
