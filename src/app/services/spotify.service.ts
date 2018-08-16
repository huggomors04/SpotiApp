import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('SpotifyService listo');
  }

  getQuery( query: string ){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD9Jt2BQ_yztnmdK6MHbNH8z77SmqVwxwQPve68Rb6zu_rHGDNKGcHzwUKe7L6HeVePg2eB9sGw6bcaGTE'
    });

    return this.http.get(url, { headers });
  }

  getNewRelease() {
    
    return this.getQuery( 'browse/new-releases?country=MX&limit=50' )
              .pipe( map( data => data['albums'].items ));
                
  }

  getArtists( termino: string){

    return this.getQuery( `search?q=${termino}&type=artist&limit=20` )
                .pipe( map( data => data['artists'].items ));
  }

  getArtist( id: string){

    return this.getQuery( `artists/${id}` );
                //.pipe( map( data => data['artists'].items ));
  }

  getTopTracks( id: string){

    return this.getQuery( `artists/${id}/top-tracks?country=MX` )
                .pipe( map( data => data['tracks'] ));
  }
}
