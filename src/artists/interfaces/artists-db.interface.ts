import { Artist } from '../entities/artist.entity';

export interface ArtistsDb {
  findAll: () => Artist[];
}
