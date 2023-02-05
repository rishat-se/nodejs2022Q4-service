import { Track } from '../entities/track.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTracksDB {
  private tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  create(track: Track) {
    this.tracks.push(track);
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    return this.tracks.find((item) => item.id === id);
  }

  update(track: Track) {
    const idx = this.tracks.findIndex((item) => item.id === track.id);
    if (idx === -1) throw new Error('entity not found');
    this.tracks.splice(idx, 1, track);
  }

  remove(id: string) {
    const idx = this.tracks.findIndex((item) => item.id === id);
    if (idx === -1) throw new Error('entity not found');
    this.tracks.splice(idx, 1);
  }
}
