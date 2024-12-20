import { Artist } from "./artist.model";

export interface Style {
  id: number;
  name: String;
  artists: Array<Artist>;
}
