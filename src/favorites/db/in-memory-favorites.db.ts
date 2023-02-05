import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class InMemoryFavoritesDB {
  private favorites: {
    artists: string[];
    albums: string[];
    tracks: string[];
  };

  constructor() {
    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  findAll() {
    return this.favorites;
  }

  findArtist(id: string) {
    return this.favorites.artists.find((item) => item === id);
  }

  findTrack(id: string) {
    return this.favorites.tracks.find((item) => item === id);
  }

  findAlbum(id: string) {
    return this.favorites.albums.find((item) => item === id);
  }

  addArtist(id: string) {
    this.favorites.artists.push(id);
  }

  removeArtist(id: string) {
    const idx = this.favorites.artists.findIndex((item) => item === id);
    if (idx === -1) throw new Error('entity not found');
    this.favorites.artists.splice(idx, 1);
  }

  addTrack(id: string) {
    this.favorites.tracks.push(id);
  }

  removeTrack(id: string) {
    const idx = this.favorites.tracks.findIndex((item) => item === id);
    if (idx === -1) throw new Error('entity not found');
    this.favorites.tracks.splice(idx, 1);
  }

  addAlbum(id: string) {
    this.favorites.albums.push(id);
  }

  removeAlbum(id: string) {
    const idx = this.favorites.albums.findIndex((item) => item === id);
    if (idx === -1) throw new Error('entity not found');
    this.favorites.albums.splice(idx, 1);
  }
}
