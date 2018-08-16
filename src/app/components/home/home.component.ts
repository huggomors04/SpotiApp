import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  mensajeError: string;
  loading: boolean;
  error: boolean;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;

    this.spotify.getNewRelease()
      .subscribe( (data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, ( error ) => {
        this.loading = false;
        this.error = true;
        this.mensajeError = error.error.error.message;
        console.log(error);
      });
  }

}
