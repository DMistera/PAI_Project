import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {map} from 'rxjs/operators'
import { TournamentService } from 'src/app/services/tournament/tournament.service';
import { Tournament } from 'src/app/models/tournament';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';

@Component({
  selector: 'app-tourament-edit',
  templateUrl: './tourament-edit.component.html',
  styleUrls: ['./tourament-edit.component.scss']
})
export class TouramentEditComponent implements OnInit {

  id : number;

  today = new Date();

  name = new FormControl("", [Validators.required]);
  discipline = new FormControl("", [Validators.required]);
  maxPlayers = new FormControl("", [Validators.required])
  startDate = new FormControl("", [Validators.required]);
  registrationDate = new FormControl("", [Validators.required]);
  description = new FormControl();
  address = new FormControl();

  form = new FormGroup({
    name: this.name,
    discipline: this.discipline,
    maxPlayers: this.maxPlayers,
    startDate: this.startDate,
    registrationDate: this.registrationDate,
    description: this.description,
    address: this.address
  })

  constructor(private activatedRoute: ActivatedRoute,
     private tournamentService: TournamentService,
     private router: Router,
     private snackBar: MatSnackBar,
     private confirmService: ConfirmService
     ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if(this.id > 0) {
        this.tournamentService.get(this.id).subscribe(tournament => {
          this.initForm(tournament);
        })
      }
    });
  }

  initForm(tournament: Tournament) {
    this.name.setValue(tournament.name)
    this.maxPlayers.setValue(tournament.maxPlayers);
    this.startDate.setValue(tournament.startDate);
    this.description.setValue(tournament.description);
    this.discipline.setValue(tournament.discipline);
    this.address.setValue(tournament.address);
    this.registrationDate .setValue(tournament.registrationDate);
  }

  submit() {
    if(this.form.valid) {
      let tournament : Tournament = this.form.getRawValue();
      if(this.id > 0) {
        tournament.id = this.id;
        this.confirmService.confirm(`Are you sure you want to edit ${tournament.name}?`, () => {
          this.tournamentService.edit(tournament).subscribe(() => {
            this.back();
            this.snackBar.open(`You have successfully edited ${tournament.name}!`, `Close`);
          });
        });
      }
      else {
        this.confirmService.confirm(`Are you sure you want to create ${tournament.name}?`, () => {
          this.tournamentService.create(tournament).subscribe(() => {
            this.back();
            this.snackBar.open(`You have successfully created ${tournament.name}!`, `Close`);
          });
        });
      }
    }
  }

  back() {
    if(this.id > 0) {
      this.router.navigate(["tournament", this.id], {relativeTo: this.activatedRoute.parent});
    }
    else {
      this.router.navigate(["tournaments"], {relativeTo: this.activatedRoute.parent});
    }
  }

}
