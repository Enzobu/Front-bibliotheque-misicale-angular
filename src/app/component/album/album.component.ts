import { AlbumService } from './../../service/album.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../../model/album.model';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit {
  albumsTemp: any = [];
  albums: Album[] = [];
  isActive = false; // Masque le loader

  constructor(private albumService: AlbumService) {
  }

  async ngOnInit()  {
    this.isActive = true; // Afficher le loader
    await this.refreshAlbums();
    this.isActive = false; // Masque le loader
    console.log(this.albums);
  }

  async refreshAlbums() {
    try {
      this.albums = await this.albumService.setApiAlbums()
    } catch (error) {
      console.log(error);
    }
  }
}
