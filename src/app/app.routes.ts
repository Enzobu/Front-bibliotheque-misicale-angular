import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './component/artist/artist.component';
import { AlbumComponent } from './component/album/album.component';
import { StyleComponent } from './component/style/style.component';
import { AccountComponent } from './component/account/account.component';
import { SongComponent } from './component/song/song.component';
import { ConnexionGuard } from './guards/connection.guard';
import { LoginComponent } from './component/login/login.component';
import { NotConnexionGuard } from './guards/notConnection.guard';
import { AddSongComponent } from './component/add-song/add-song.component';
import { UpdateSongComponent } from './component/update-song/update-song.component';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const routes: Routes = [
  { path: "", component: ArtistComponent, canActivate: [ConnexionGuard]},
  { path: "home", component: ArtistComponent, canActivate: [ConnexionGuard]},
  { path: "artists", component: ArtistComponent, canActivate: [ConnexionGuard]},
  { path: "albums", component: AlbumComponent, canActivate: [ConnexionGuard]},
  { path: "styles", component: StyleComponent, canActivate: [ConnexionGuard]},
  { path: "songs", component: SongComponent, canActivate: [ConnexionGuard]},
  { path: "account", component: AccountComponent, canActivate: [ConnexionGuard]},
  { path: "add-song", component: AddSongComponent,  canActivate: [ConnexionGuard]},
  { path: "update-song/:id", component: UpdateSongComponent,  canActivate: [ConnexionGuard]},
  { path: "login", component: LoginComponent,  canActivate: [NotConnexionGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule {}
