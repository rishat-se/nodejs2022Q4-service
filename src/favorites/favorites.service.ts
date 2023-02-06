import { Injectable } from '@nestjs/common';
import { InMemoryAlbumsDB } from 'src/albums/db/in-memory-albums.db';
import { InMemoryArtistsDB } from 'src/artists/db/in-memory-artists.db';
import { InMemoryTracksDB } from 'src/tracks/db/in-memory-tracks.db';
import { InMemoryFavoritesDB } from './db/in-memory-favorites.db';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesDB: InMemoryFavoritesDB,
    private artistsDB: InMemoryArtistsDB,
    private tracksDB: InMemoryTracksDB,
    private albumsDB: InMemoryAlbumsDB,
  ) {}

  findAll() {
    const favorites = this.favoritesDB.findAll();
    const favoritesEntities = {
      artists: favorites.artists.map((id) => this.artistsDB.findOne(id)),
      albums: favorites.albums.map((id) => this.albumsDB.findOne(id)),
      tracks: favorites.tracks.map((id) => this.tracksDB.findOne(id)),
    };
    return favoritesEntities;
  }

  addArtist(id: string) {
    const artist = this.artistsDB.findOne(id);
    if (!artist) throw new Error('entity not found');
    // const artistInFavs = this.favoritesDB.findArtist(id);
    // if (artistInFavs) throw new Error('id already exists');
    this.favoritesDB.addArtist(id);
  }

  removeArtist(id: string) {
    //check if artist present in favorites
    const artist = this.favoritesDB.findArtist(id);
    if (!artist) throw new Error('entity not found');
    this.favoritesDB.removeArtist(id);
  }

  addTrack(id: string) {
    const track = this.tracksDB.findOne(id);
    if (!track) throw new Error('entity not found');
    this.favoritesDB.addTrack(id);
  }

  removeTrack(id: string) {
    this.favoritesDB.removeTrack(id);
  }

  addAlbum(id: string) {
    const track = this.albumsDB.findOne(id);
    if (!track) throw new Error('entity not found');
    this.favoritesDB.addAlbum(id);
  }

  removeAlbum(id: string) {
    this.favoritesDB.removeAlbum(id);
  }
}
