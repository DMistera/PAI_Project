import { Injectable } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournaments = new BehaviorSubject<Tournament[]>(null);
  private tournamentMap = new Map<string, BehaviorSubject<Tournament>>();

  constructor(private http: HttpClient) {
    this.updateTournaments();
  }

  public getAll() : Observable<Tournament[]> {
    return this.tournaments.asObservable().pipe(filter(tournaments => tournaments != null));
  }

  public get(id : number) : Observable<Tournament> {
    if(!this.tournamentMap.has(id.toString())) {
      this.tournamentMap.set(id.toString(), new BehaviorSubject(null));
      this.updateSingle(id);
    }
    return this.tournamentMap.get(id.toString()).asObservable();
  }

  public create(tournament: Tournament) : Observable<any> {
    return this.http.post("api/rest/tournament/create", tournament).pipe(tap(() => {
      this.updateTournaments();
    }));
  }

  public edit(tournament: Tournament) : Observable<any> {
    return this.http.post("api/rest/tournament/edit", tournament).pipe(tap(() => {
      this.updateTournaments(tournament.id);
    }));
  }

  public delete(id: number) : Observable<any> {
    return this.http.delete("api/rest/tournament/" + id).pipe(tap(() => {
      this.tournamentMap.delete(id.toString());
      this.updateTournaments();
    }));
  }

  public join(id: number) {
    return this.http.post(`api/rest/tournament/join`, id).pipe(tap(() => {
      this.updateTournaments(id);
    }));
  }

  
  public close(id: number) {
    return this.http.post(`api/rest/tournament/close`, id).pipe(tap(() => {
      this.updateTournaments(id);
    }));
  }

  public start(id: number) {
    return this.http.post(`api/rest/tournament/start`, id).pipe(tap(() => {
      this.updateTournaments(id);
    }));
  }

  public finish(id: number) {
    return this.http.post(`api/rest/tournament/finish`, id).pipe(tap(() => {
      this.updateTournaments(id);
    }));
  }

  public leave(id: number) {
    return this.http.post(`api/rest/tournament/leave`, id).pipe(tap(() => {
      this.updateTournaments(id);
    }));
  }

  public winner(id: number, matchID: number, winner: string) {
    return this.http.post(`api/rest/tournament/winner`, {tournamentID: id, matchID: matchID, winnerEmail: winner}).pipe(tap(() => {
      this.updateTournaments(id);
    }));
  }

  private updateSingle(id: number) {
    if(this.tournamentMap.has(id.toString())) {
      let tournament$ = this.tournamentMap.get(id.toString());
      this.getSingle(id).subscribe((tournament) => {
        tournament$.next(tournament);
      });
    }
    
  }

  private updateTournaments(id ?: number) {
    if(id) {
      this.updateSingle(id);
    }
    this.http.get<Tournament[]>("api/rest/tournament/all").subscribe((tournaments) => {
      this.tournaments.next(tournaments);
    });
  }

  private getSingle(id : number) : Observable<Tournament> {
    return this.http.get<Tournament>("api/rest/tournament/" + id);
  }
}
