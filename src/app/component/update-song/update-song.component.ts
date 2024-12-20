import { SongService } from './../../service/song.service';
import { AlbumService } from './../../service/album.service';
import { ArtistService } from './../../service/artist.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Song } from '../../model/song.model';
import { Artist } from '../../model/artist.model';
import { Album } from '../../model/album.model';

@Component({
  selector: 'app-update-song',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-song.component.html',
  styleUrl: './update-song.component.scss'
})
export class UpdateSongComponent implements OnInit {
  updateSongForm!: FormGroup;
  artists: Artist[] = [];
  albums: Album[] = [];
  albumsFiltered: Album[] = [];
  song: Song[] = [];
  _id: number = 0;
  titleValue: String = "";
  durationValue: number = 0;
  artistValue: number = 0;
  albumValue: number = 0;
  isActive = false;

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private userService : UserService, private router : Router, private artistService: ArtistService, private albumService: AlbumService, private songService : SongService) {
    this.updateSongForm = this.fb.group({
      title: [""],
      duration: [""],
      artistsSelect: [""],
      albumsSelect: [""]
    });
  }

  async ngOnInit()  {
    this.isActive = true;

    await this.getArtists();
    await this.getAlbums();
    await this.getIdByUrl();
    await this.getSong();

    await this.setForm();
    await this.albumFilter();

    this.isActive = false;
  }

  async getSong() {
    this.song = [];
    this.song.push(await this.songService.getSongsById(this._id));
  }

  getIdByUrl() {
    this._id = Number(this.route.snapshot.paramMap.get('id'));
  }

  async getArtists() {
    try {
      this.artists = await this.artistService.setApiArtists()
    } catch (error) {
      console.log(error);
    }
  }

  async setForm() {
    const song = this.song[0];

    this.updateSongForm.patchValue({
      title: song.title,
      duration: song.duration,
      artistsSelect: song.artists[0]?.id || -1,
      albumsSelect: song.album?.id || -1
    });

    this.titleValue = song.title;
    this.durationValue = song.duration;
    this.artistValue = song.artists[0]?.id || -1;
    this.albumValue = song.album?.id || -1;
  }

  async getAlbums() {
    try {
      this.albums = await this.albumService.setApiAlbums()
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(): void {
    console.log(this.updateSongForm.value);
    const tab = {
      id: this._id,
      title: this.updateSongForm.value.title,
      duration: this.updateSongForm.value.duration,
      album: this.updateSongForm.value.albumsSelect,
      artists: this.updateSongForm.value.artistsSelect
    }

    this.router.navigate(["/songs"])
  }

  async albumFilter() {
    const artistId = parseInt(this.updateSongForm.value.artistsSelect);
    if (artistId != -1) {
      this.albumsFiltered = this.albums.filter((album) => album.artist.id === artistId);
    } else {
      this.albumsFiltered = [];
    }
    console.log(this.albumsFiltered);
  }
}
