import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Style } from '../../model/style.model';
import { StyleService } from '../../service/style.service';

@Component({
  selector: 'app-style',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './style.component.html',
  styleUrl: './style.component.scss'
})
export class StyleComponent implements OnInit {
  stylesTemp: any = [];
  styles: Style[] = [];
  isActive = false; // Masque le loader

  constructor(private styleService: StyleService) {
  }

  async ngOnInit()  {
    this.isActive = true; // Afficher le loader
    await this.refreshStyles();
    this.isActive = false; // Masque le loader
    console.log(this.styles);
  }

  async refreshStyles() {
    try {
      this.styles = await this.styleService.setApiStyles()
    } catch (error) {
      console.log(error);
    }
  }
}
