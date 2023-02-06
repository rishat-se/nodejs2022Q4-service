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
    //check if artist present in artistsDB
    const artist = this.artistsDB.findOne(id);
    if (!artist) throw new Error('entity not found');
    //if artist is already in favs, do nothing
    if (!this.favoritesDB.findArtist(id)) {
      this.favoritesDB.addArtist(id);
    }
  }

  removeArtist(id: string) {
    this.favoritesDB.removeArtist(id);
  }

  addTrack(id: string) {
    //check if track present in tracksDB
    const track = this.tracksDB.findOne(id);
    if (!track) throw new Error('entity not found');
    //if track is already in favs, do nothing
    if (!this.favoritesDB.findTrack(id)) {
      this.favoritesDB.addTrack(id);
    }
  }

  removeTrack(id: string) {
    this.favoritesDB.removeTrack(id);
  }

  addAlbum(id: string) {
    //check if album present in albumsDB
    const track = this.albumsDB.findOne(id);
    if (!track) throw new Error('entity not found');
    //if album is already in favs, do nothing
    if (!this.favoritesDB.findAlbum(id)) {
      this.favoritesDB.addAlbum(id);
    }
  }

  removeAlbum(id: string) {
    this.favoritesDB.removeAlbum(id);
  }
}
