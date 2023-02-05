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

  addArtist(id: string) {
    this.favorites.artists.push(id);
  }

  removeArtist(id: string) {
    const idx = this.favorites.artists.findIndex((item) => item === id);
    if (idx === -1) throw new Error('entity not found');
    this.favorites.artists.splice(idx, 1);
  }

  // findOne(id: string) {
  //   return this.favorites.find((item) => item.id === id);
  // }

  // update(user: User) {
  //   const idx = this.favorites.findIndex((item) => item.id === user.id);
  //   if (idx === -1) throw new Error('entity not found');
  //   this.favorites.splice(idx, 1, user);
  // }
}
