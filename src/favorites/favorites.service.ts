import { Injectable } from '@nestjs/common';
import { InMemoryArtistsDb } from 'src/artists/db/in-memory-artists.db';
import { InMemoryFavoritesDB } from './db/in-memory-favorites.db';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesDB: InMemoryFavoritesDB,
    private artistsDb: InMemoryArtistsDb,
  ) {}

  findAll() {
    const favorites = this.favoritesDB.findAll();
    const favoritesEntities = {
      artists: favorites.artists.map((id) => this.artistsDb.findOne(id)),
    };
    return favoritesEntities;
  }

  addArtist(id: string) {
    const artist = this.artistsDb.findOne(id);
    if (!artist) throw new Error('entity not found');
    // const artistInFavs = this.favoritesDB.findArtist(id);
    // if (artistInFavs) throw new Error('id already exists');
    this.favoritesDB.addArtist(id);
  }

  removeArtist(id: string) {
    this.favoritesDB.removeArtist(id);
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
