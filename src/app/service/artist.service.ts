import { Injectable } from '@angular/core';
import { Artist } from '../model/artist.model';
import { retry } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { ApiBaseUrl } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  artists: Artist[] = [];
  artistsTemp : any = [];
  readonly ApiUrl: String = ApiBaseUrl + "/api/artist";

  constructor() {
  }

  async setApiArtists() {
    this.artistsTemp = await this.getArtists()
    const newArtists = [];
    for (const artist of this.artistsTemp) {
      newArtists.push({
        id: artist.id,
        name: artist.name,
        illustration: artist.illustration,
        albums: artist.albums,
        songs: artist.songs,
      });
    }
    this.artists = newArtists;
    return this.artists;
  }

  async getArtistById(id: number): Promise<Artist[]> {
    this.artists = await this.getArtists();
    return this.artists.filter((artist: Artist) => artist.id === id);
  }

  async getArtists():Promise<Artist[]> {
    try {
      const response = await axios.get<Artist[]>(`${this.ApiUrl}/get-artists`);
      return response.data;
    } catch (error) {
      console.error("erreur récupération artist : ", error);
      return [];
    }
  }
}
