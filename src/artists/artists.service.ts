import { Injectable } from '@nestjs/common';
import { InMemoryArtistsDB } from './db/in-memory-artists.db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryTracksDB } from 'src/tracks/db/in-memory-tracks.db';
import { InMemoryAlbumsDB } from 'src/albums/db/in-memory-albums.db';
import { InMemoryFavoritesDB } from 'src/favorites/db/in-memory-favorites.db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(
    private artistsDB: InMemoryArtistsDB,
    private tracksDB: InMemoryTracksDB,
    private albumsDB: InMemoryAlbumsDB,
    private favoritesDB: InMemoryFavoritesDB,
    private prisma: PrismaService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });
    return newArtist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUniqueOrThrow({
      where: { id },
    });
    //    if (!artist) throw new Error('entity not found');
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    // const artist = this.artistsDB.findOne(id);
    // if (!artist) throw new Error('entity not found');
    // const updArtist = { ...artist, ...updateArtistDto };
    // this.artistsDB.update(updArtist);
    // return updArtist;

    // const artist = this.artistsDB.findOne(id);
    // if (!artist) throw new Error('entity not found');
    // const updArtist = { ...artist, ...updateArtistDto };
    const updArtist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    return updArtist;
  }

  async remove(id: string) {
    // //remove artist id from all tracks
    // const tracksAll = this.tracksDB.findAll();
    // tracksAll.forEach((track) => {
    //   if (track.artistId === id) {
    //     this.tracksDB.update({ ...track, artistId: null });
    //   }
    // });

    // //remove artist id from all albums
    // const albumsAll = this.albumsDB.findAll();
    // albumsAll.forEach((album) => {
    //   if (album.artistId === id) {
    //     this.albumsDB.update({ ...album, artistId: null });
    //   }
    // });
    // //remove artist id from favorites
    // if (this.favoritesDB.findArtist(id)) {
    //   this.favoritesDB.removeArtist(id);
    // }
    // this.artistsDB.remove(id);

    // //remove artist id from favorites
    // if (this.favoritesDB.findArtist(id)) {
    //   this.favoritesDB.removeArtist(id);
    // }
    await this.prisma.artist.delete({
      where: { id },
    });
  }
}
