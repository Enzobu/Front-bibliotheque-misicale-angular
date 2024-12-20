import { Artist } from "./artist.model";
import { Song } from "./song.model";

export interface Album {
  id: number;
  title: String;
  releaseDate: Date;
  cover: String;
  artist: Artist;
  songs: Array<Song>;
}
