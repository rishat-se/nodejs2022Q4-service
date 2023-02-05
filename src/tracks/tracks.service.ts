import { Injectable } from '@nestjs/common';
import { InMemoryTracksDB } from './db/in-memory-tracks.db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  constructor(private tracksDB: InMemoryTracksDB) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
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
    const track = this.tracksDB.findOne(id);
    if (!track) throw new Error('entity not found');
    const updTrack = { ...track, ...updateTrackDto };
    this.tracksDB.update(updTrack);
    return updTrack;
  }

  remove(id: string) {
    this.tracksDB.remove(id);
  }
}
