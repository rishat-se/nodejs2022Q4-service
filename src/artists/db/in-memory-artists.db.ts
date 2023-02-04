import { CreateArtistDto } from '../dto/create-artist.dto';
import { Artist } from '../entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { ArtistsDb } from '../interfaces/artists-db.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryArtistsDb implements ArtistsDb {
  //private artists: Artist[];

  private artists: Artist[] = [
    {
      id: 'artistId',
      name: 'Kate Winslet',
      grammy: true,
    },
  ];

  create(createArtistDto: CreateArtistDto) {
    return 'some text';
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((key) => key.id === id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = this.artists.find((key) => key.id === id);
    return { ...user, ...updateUserDto };
  }

  remove(id: string) {
    const idx = this.artists.findIndex((item) => item.id === id);
    this.artists.splice(idx, 1);
    //    return `This action removes a #${id} user`;
  }
}
