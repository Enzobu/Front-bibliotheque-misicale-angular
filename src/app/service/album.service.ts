import { Injectable } from '@angular/core';
import { Album } from '../model/album.model';
import { retry } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { ApiBaseUrl } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  albums: Album[] = [];
  albumsTemp : any = [];
  readonly ApiUrl: String = ApiBaseUrl + "/api/album";

  constructor() {
  }

  async setApiAlbums() {
    this.albumsTemp = await this.getAlbums()
    const newAlbums = [];
    for (const album of this.albumsTemp) {
      newAlbums.push({
        id: album.id,
        title: album.title,
        releaseDate: album.releaseDate,
        cover: album.cover,
        artist: album.artist,
        songs: album.songs,
      });
    }
    this.albums = newAlbums;
    return this.albums;
  }

  async getAlbums():Promise<Album[]> {
    try {
      const response = await axios.get<Album[]>(`${this.ApiUrl}/get-albums`);
      return response.data;
    } catch (error) {
      console.error("erreur récupération album : ", error);
      return [];
    }
  }
}
