import { Album } from "./album.model";
import { Song } from "./song.model";

export interface Artist {
  id: number;
  name: String;
  illustration: String;
  albums: Array<Album>;
  songs: Array<Song>;
}
