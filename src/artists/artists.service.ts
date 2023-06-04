import { Injectable } from '@nestjs/common';
import { InMemoryArtistsDB } from './db/in-memory-artists.db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryTracksDB } from 'src/tracks/db/in-memory-tracks.db';
import { InMemoryAlbumsDB } from 'src/albums/db/in-memory-albums.db';
import { InMemoryFavoritesDB } from 'src/favorites/db/in-memory-favorites.db';

@Injectable()
export class ArtistsService {
  constructor(
    private artistsDB: InMemoryArtistsDB,
    private tracksDB: InMemoryTracksDB,
    private albumsDB: InMemoryAlbumsDB,
    private favoritesDB: InMemoryFavoritesDB,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artistsDB.create(newArtist);
    return newArtist;
  }

  findAll() {
    return this.artistsDB.findAll();
  }

  findOne(id: string) {
    const artist = this.artistsDB.findOne(id);
    if (!artist) throw new Error('entity not found');
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artistsDB.findOne(id);
    if (!artist) throw new Error('entity not found');
    const updArtist = { ...artist, ...updateArtistDto };
    this.artistsDB.update(updArtist);
    return updArtist;
  }

  remove(id: string) {
    //remove artist id from all tracks
    const tracksAll = this.tracksDB.findAll();
    tracksAll.forEach((track) => {
      if (track.artistId === id) {
        this.tracksDB.update({ ...track, artistId: null });
      }
    });

    //remove artist id from all albums
    const albumsAll = this.albumsDB.findAll();
    albumsAll.forEach((album) => {
      if (album.artistId === id) {
        this.albumsDB.update({ ...album, artistId: null });
      }
    });
    //remove artist id from favorites
    if (this.favoritesDB.findArtist(id)) {
      this.favoritesDB.removeArtist(id);
    }
    this.artistsDB.remove(id);
  }
}
