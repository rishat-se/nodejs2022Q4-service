import { Injectable } from '@nestjs/common';
import { InMemoryAlbumsDB } from './db/in-memory-albums.db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private albumsDB: InMemoryAlbumsDB) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
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
    const artist = this.albumsDB.findOne(id);
    if (!artist) throw new Error('entity not found');
    const updArtist = { ...artist, ...updateAlbumDto };
    this.albumsDB.update(updArtist);
    return updArtist;
  }

  remove(id: string) {
    this.albumsDB.remove(id);
  }
}
