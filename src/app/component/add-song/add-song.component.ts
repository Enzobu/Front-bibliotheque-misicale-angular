import { SongService } from './../../service/song.service';
import { AlbumService } from './../../service/album.service';
import { ArtistService } from './../../service/artist.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Song } from '../../model/song.model';
import { Artist } from '../../model/artist.model';
import { Album } from '../../model/album.model';

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.scss'
})
export class AddSongComponent implements OnInit {
  addSongForm!: FormGroup;
  artists: Artist[] = [];
  albums: Album[] = [];
  albumsFiltered: Album[] = [];
  isActive = false;

  constructor(private fb: FormBuilder, private userService : UserService, private router : Router, private artistService: ArtistService, private albumService: AlbumService, private songService : SongService) {
    this.addSongForm = this.fb.group({
      title: [''],
      duration: [''],
      artistsSelect: ['-1'],
      albumsSelect: ['-1']
    });
  }

  async ngOnInit()  {
    this.isActive = true;
    await this.getArtists();
    await this.getAlbums();
    this.isActive = false;
  }

  async getArtists() {
    try {
      this.artists = await this.artistService.setApiArtists()
    } catch (error) {
      console.log(error);
    }
  }

  async getAlbums() {
    try {
      this.albums = await this.albumService.setApiAlbums()
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(): void {
    console.log(this.addSongForm.value);
    const tab = {
      title: this.addSongForm.value.title,
      duration: this.addSongForm.value.duration,
      album: this.addSongForm.value.albumsSelect,
      artists: this.addSongForm.value.artistsSelect
    }

    console.log(this.songService.addSong(JSON.stringify(tab)));
    this.router.navigate(["/songs"])
  }

  albumFilter() {
    const artistId = parseInt(this.addSongForm.value.artistsSelect);
    if (artistId != -1) {
      this.albumsFiltered = this.albums.filter((album) => album.artist.id === artistId);
    } else {
      this.albumsFiltered = [];
    }
    console.log(this.albumsFiltered);
  }
}
