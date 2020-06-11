import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/models/tournament';
import { map, mergeMap, retry, tap } from 'rxjs/operators';
import { TournamentService } from 'src/app/services/tournament/tournament.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { GoogleMapsService } from 'src/app/services/google-maps/google-maps.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  tournament$ : Observable<Tournament>
  user$: Observable<User>
  location$: Observable<any>

  participantTableColumns = [
    "name", "actions"
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService,
    private confirmService: ConfirmService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private googleMapsService: GoogleMapsService
  ) { }

  ngOnInit(): void {
    this.tournament$ = this.activatedRoute.params.pipe(mergeMap(params => {
      let id = params["id"];
      return this.tournamentService.get(id);
    }));
    this.user$ = this.userService.currentUser();
    this.location$ = this.tournament$.pipe(mergeMap(tournament => {
      return this.googleMapsService.geolocate(tournament.address);
    }))
    
    this.googleMapsService.geolocate("Włocławek Kaliska 104");
  }


  isOwner(tournament: Tournament, user: User) : boolean {
    return tournament.organizer.email == user.email;
  }

  hasJoined(tournament: Tournament, user: User) : boolean {
    return tournament.participants.find(participant => {
      return participant.email == user.email;
    }) != undefined;
  }

  leave(tournament: Tournament) {
    this.confirmService.confirm(`Are you sure you want to leave ${tournament.name}?`, () => {
      this.tournamentService.leave(tournament.id).subscribe(() => {
        this.snackBar.open(`You have successfully left ${tournament.name}!`, `Close`);
      });
    });
  }

  join(tournament: Tournament) {
    this.confirmService.confirm(`Are you sure you want to join ${tournament.name}?`, () => {
      if((new Date()).getTime() > (new Date(tournament.registrationDate)).getTime()) {
        this.snackBar.open(`It is past the registration closing date!`, `Close`);
      }
      else {
        this.tournamentService.join(tournament.id).subscribe(() => {
          this.snackBar.open(`You have successfully joined ${tournament.name}!`, `Close`);
        });
      }
    })
  }

  edit(tournament : Tournament) {
    this.router.navigate(["tournament-edit", tournament.id], {relativeTo: this.activatedRoute.parent});
  }

  close(tournament: Tournament) {
    if(tournament.participants.length < 2) {
      this.snackBar.open(`${tournament.name} must have a minimum of 2 participant to start!`, `Close`);
    }
    else {
      this.confirmService.confirm(`Are you sure you want to close registration for ${tournament.name}?`, () => {
        this.tournamentService.close(tournament.id).subscribe(() => {
          this.snackBar.open(`You have successfully closed registration for ${tournament.name}!`, `Close`);
        });
      })
    }
  }

  start(tournament: Tournament) {
    this.confirmService.confirm(`Are you sure you want to start ${tournament.name}?`, () => {
      this.tournamentService.start(tournament.id).subscribe(() => {
        this.snackBar.open(`You have successfully started ${tournament.name}!`, `Close`);
      });
    });
  }

  finish(tournament: Tournament) {
    this.confirmService.confirm(`Are you sure you want to finish ${tournament.name}?`, () => {
      this.tournamentService.finish(tournament.id).subscribe(() => {
        this.snackBar.open(`You have successfully finished ${tournament.name}!`, `Close`);
      });
    })
  }

  delete(tournament : Tournament) {
    this.confirmService.confirm(`Are you sure you want to delete ${tournament.name}?`, () => {
      this.tournamentService.delete(tournament.id).subscribe(() => {
        this.snackBar.open(`${tournament.name} has been deleted.`, `Close`);
        this.router.navigate(["tournaments"], {relativeTo: this.activatedRoute.parent});
      });
    });
  }

  beautifyDate(str: string) {
    const date = new Date(str);
    return date.toLocaleDateString();
  }
}
