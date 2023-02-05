import { Injectable } from '@nestjs/common';
import { InMemoryArtistsDB } from './db/in-memory-artists.db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private artistsDB: InMemoryArtistsDB) {}

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
    this.artistsDB.remove(id);
  }
}
