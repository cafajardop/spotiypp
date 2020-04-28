import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQAKZi-cjOpZzFyOFNOM-Woln_PV3v0p0ulHhQieUVNZKugVGToVkG6u3I_4uNJBDJifb6r6B2jETFgDPe4',
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    // const headers = new HttpHeaders({
    //   Authorization:'Bearer BQBCKf1boG9RLOT0OsJh9GaWKf_HVVQyWJVGPq2oOOPz2CKILdO4z3NpJLg8r2GxWqUsFMqLvyw1gTDo1SM',
    // });
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => data['albums'].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => data['artists'].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe(map(data => data['tracks']));
  }
}
