import { Album } from "./album.model";
import { Artist } from "./artist.model";

export interface Song {
  id: number;
  title: String;
  duration: number;
  album: Album;
  artists: Array<Artist>;
}
