import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '../../model/artist.model';
import { ArtistService } from '../../service/artist.service';
import { SongService } from '../../service/song.service';
import { Song } from './../../model/song.model';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent implements OnInit {
  artistsTemp: any = [];
  artists: Artist[] = [];
  isActive = false; // Masque le loader

  constructor(private artistService: ArtistService) {
  }

  async ngOnInit()  {
    this.isActive = true; // Afficher le loader
    await this.refreshArtists();
    this.isActive = false; // Masque le loader
    console.log(this.artists);
  }

  async refreshArtists() {
    try {
      this.artists = await this.artistService.setApiArtists()
    } catch (error) {
      console.log(error);
    }
  }
}
