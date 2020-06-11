import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, first, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private map = new Map<string, any>();

  constructor(private http: HttpClient) { }

  public geolocate(address: string) : Observable<any> {
    if(this.map.has(address)) {
      return of(this.map.get(address));
    }
    else {
      return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyANTSk7gPcH5sMeJYHerostz0NQa2LfCFQ`).pipe(first(), map(coords => {
        if(coords.results.length == 0) {
          return null;
        }
        else {
          return coords.results[0].geometry.location;
        }
      }, tap(result => {
        this.map.set(address, result);
      })));
    }
  }
}
