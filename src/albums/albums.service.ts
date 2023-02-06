import { Injectable } from '@nestjs/common';
import { InMemoryAlbumsDB } from './db/in-memory-albums.db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryArtistsDB } from 'src/artists/db/in-memory-artists.db';
import { InMemoryFavoritesDB } from 'src/favorites/db/in-memory-favorites.db';
import { InMemoryTracksDB } from 'src/tracks/db/in-memory-tracks.db';

@Injectable()
export class AlbumsService {
  constructor(
    private albumsDB: InMemoryAlbumsDB,
    private artistsDB: InMemoryArtistsDB,
    private favoritesDB: InMemoryFavoritesDB,
    private tracksDB: InMemoryTracksDB,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId) {
      const artist = this.artistsDB.findOne(createAlbumDto.artistId);
      if (!artist) throw new Error('field is incorrect');
    }
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
      artistId: !createAlbumDto.artistId ? null : createAlbumDto.artistId,
    };
    this.albumsDB.create(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albumsDB.findAll();
  }

  findOne(id: string) {
    const artist = this.albumsDB.findOne(id);
    if (!artist) throw new Error('entity not found');
    return artist;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (updateAlbumDto.artistId) {
      const artist = this.artistsDB.findOne(updateAlbumDto.artistId);
      if (!artist) throw new Error('field is incorrect');
    }
    const artist = this.albumsDB.findOne(id);
    if (!artist) throw new Error('entity not found');
    const updArtist = { ...artist, ...updateAlbumDto };
    this.albumsDB.update(updArtist);
    return updArtist;
  }

  remove(id: string) {
    //remove album id from all tracks
    const tracksAll = this.tracksDB.findAll();
    tracksAll.forEach((track) => {
      if (track.albumId === id) {
        this.tracksDB.update({ ...track, albumId: null });
      }
    });
    //remove album id from favorites
    if (this.favoritesDB.findAlbum(id)) {
      this.favoritesDB.removeAlbum(id);
    }
    //remove album
    this.albumsDB.remove(id);
  }
}
