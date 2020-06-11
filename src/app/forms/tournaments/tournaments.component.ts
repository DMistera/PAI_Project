import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament/tournament.service';
import { Tournament } from 'src/app/models/tournament';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {

  //tournaments$ : Observable<Tournament[]>;
  dataSource = new MatTableDataSource([]);

  tournamentTableColumns = [
    "name", "discipline", "organizer", "maxPlayers", "actions"
  ]

  constructor(
    private tournamentService: TournamentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.tournamentService.getAll().subscribe((tournaments) => {
      const data = tournaments.map(tournament => {
        return {
          id: tournament.id,
          name: tournament.name,
          organizer: `${tournament.organizer.name} ${tournament.organizer.surname}`,
          discipline: tournament.discipline,
          slots: `${tournament.participants.length}/${tournament.maxPlayers}`
        }
      })
      this.dataSource = new MatTableDataSource(data);
    })
  }

  view(id: number) {
    this.router.navigate(["tournament", id], {relativeTo: this.activatedRoute.parent});;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
