import { Injectable } from '@angular/core';
import { Song } from '../model/song.model';
import { retry } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { ApiBaseUrl } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  songs: Song[] = [];
  songsTemp : any = [];
  readonly ApiUrl: String = ApiBaseUrl + "/api/song";

  constructor() {
  }

  async setApiSongs() {
    this.songsTemp = await this.getSongs()
    const newSongs = [];
    for (const song of this.songsTemp) {
      newSongs.push({
        id: song.id,
        title: song.title,
        duration: song.duration,
        album: song.album,
        artists: song.artists,
      });
    }
    this.songs = newSongs;
    return this.songs;
  }

  async getSongs():Promise<Song[]> {
    try {
      const response = await axios.get<Song[]>(`${this.ApiUrl}/get-songs`);
      return response.data;
    } catch (error) {
      console.error("erreur récupération song : ", error);
      return [];
    }
  }

  async getSongsById(id: number):Promise<Song> {
    let songsTemp = await this.getSongs();
    const song = songsTemp.find((song) => song.id === id);
    if (!song) {
      console.error("Son innexixtant");
      throw new Error(`Song with id ${id} not found`);
    }
    return song;
  }

  async addSong(song: String) {
    console.log(song);
    try {
      const response = await axios.post(`${this.ApiUrl}/add-song`, song);
      return response.data;
    } catch (error) {
      console.error("erreur récupération song : ", error);
      return false;
    }
  }

  async updateSong(song: String) {
    console.log(" azrfdf : " + song);
    try {
      const response = await axios.put(`${this.ApiUrl}/update-song`, song);
      return response.data;
    } catch (error) {
      console.error("erreur récupération song : ", error);
      return false;
    }
  }

  async deleteSong(song: String) {
    console.log(song);
    try {
      const response = await axios.delete(`${this.ApiUrl}/remove-song`, {
        data: song
      });
      return response.data;
    } catch (error) {
      console.error("erreur récupération song : ", error);
      return false;
    }
  }
}
