import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../model/song.model';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SongService } from '../../service/song.service';
import { DurationPipe } from '../../pipe/duration.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [CommonModule, DurationPipe, RouterModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss'
})
export class SongComponent implements OnInit {
  songsTemp: any = [];
  songs: Song[] = [];
  isActive = false;

  constructor(private songService: SongService, private router : Router) {
  }

  async ngOnInit()  {
    this.isActive = true;
    await this.refreshSongs();
    this.isActive = false;
    console.log(this.songs);
  }

  async refreshSongs() {
    try {
      this.songs = await this.songService.setApiSongs()
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSong(songId: number) {
    const tab = {
      id: songId
    }

    this.songService.deleteSong(JSON.stringify(tab));
    window.location.reload();
  }
}
