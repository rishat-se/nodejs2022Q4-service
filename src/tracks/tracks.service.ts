import { Injectable } from '@nestjs/common';
import { InMemoryTracksDB } from './db/in-memory-tracks.db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryAlbumsDB } from 'src/albums/db/in-memory-albums.db';
import { InMemoryArtistsDB } from 'src/artists/db/in-memory-artists.db';
import { InMemoryFavoritesDB } from 'src/favorites/db/in-memory-favorites.db';

@Injectable()
export class TracksService {
  constructor(
    private tracksDB: InMemoryTracksDB,
    private albumsDB: InMemoryAlbumsDB,
    private artistsDB: InMemoryArtistsDB,
    private favoritesDB: InMemoryFavoritesDB,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    //if albumId defined check if album in albumsDB
    if (createTrackDto.albumId) {
      const album = this.albumsDB.findOne(createTrackDto.albumId);
      if (!album) throw new Error('field is incorrect');
    }
    //if artistId defined check if artist in artistsDB
    if (createTrackDto.artistId) {
      const artist = this.artistsDB.findOne(createTrackDto.artistId);
      if (!artist) throw new Error('field is incorrect');
    }

    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
      artistId: !createTrackDto.artistId ? null : createTrackDto.artistId,
      albumId: !createTrackDto.albumId ? null : createTrackDto.albumId,
    };
    this.tracksDB.create(newTrack);
    return newTrack;
  }

  findAll() {
    return this.tracksDB.findAll();
  }

  findOne(id: string) {
    const track = this.tracksDB.findOne(id);
    if (!track) throw new Error('entity not found');
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    //if albumId defined check if album in albumsDB
    if (updateTrackDto.albumId) {
      const album = this.albumsDB.findOne(updateTrackDto.albumId);
      if (!album) throw new Error('field is incorrect');
    }
    //if artistId defined check if artist in artistsDB
    if (updateTrackDto.artistId) {
      const artist = this.artistsDB.findOne(updateTrackDto.artistId);
      if (!artist) throw new Error('field is incorrect');
    }
    const track = this.tracksDB.findOne(id);
    if (!track) throw new Error('entity not found');
    const updTrack = { ...track, ...updateTrackDto };
    this.tracksDB.update(updTrack);
    return updTrack;
  }

  remove(id: string) {
    //remove track id from favorites
    if (this.favoritesDB.findTrack(id)) {
      this.favoritesDB.removeTrack(id);
    }
    //remove track
    this.tracksDB.remove(id);
  }
}
