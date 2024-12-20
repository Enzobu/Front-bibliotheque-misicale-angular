import { Artist } from './../model/artist.model';
import { Injectable } from '@angular/core';
import { Style } from '../model/style.model';
import { retry } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { ApiBaseUrl } from '../../../config';
import { ArtistService } from './artist.service';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  styles: Style[] = [];
  stylesTemp : any = [];
  artistTemp : Artist[] = [];
  readonly ApiUrl: String = ApiBaseUrl + "/api/style";

  constructor(private artistService: ArtistService) {
  }

  async setApiStyles(): Promise<Style[]> {
    this.stylesTemp = await this.getStyles()
    const newStyles = [];
    for (const style of this.stylesTemp) {
      newStyles.push({
        id: style.id,
        name: style.name,
        artists: style.artists,
      });
    }
    this.styles = newStyles;
    return this.styles;
  }

  async getStyles(): Promise<Style[]> {
    try {
      const response = await axios.get<Style[]>(`${this.ApiUrl}/get-styles`);
      return response.data;
    } catch (error) {
      console.error("erreur récupération style : ", error);
      return [];
    }
  }
}
