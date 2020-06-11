import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { Match } from 'src/app/models/match';
import { User } from 'src/app/models/user';
import { TournamentService } from 'src/app/services/tournament/tournament.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tournament-bracket',
  templateUrl: './tournament-bracket.component.html',
  styleUrls: ['./tournament-bracket.component.scss']
})
export class TournamentBracketComponent implements OnInit {

  @Input()
  tournament: Tournament;

  @Input()
  editable: boolean;

  @Input()
  user: User;

  constructor(
    private tournamentService: TournamentService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    console.log(this.editable);
  }

  maxRounds() {
    if(this.tournament.rootMatch) {
      return this.treeLength(this.tournament.rootMatch);
    }
    else {
      return 0;
    }
  }

  private treeLength(match: Match) {
    let m1 = match.submatch1 ? this.treeLength(match.submatch1) : 0;
    let m2 = match.submatch2 ? this.treeLength(match.submatch2) : 0;
    let r = m1 > m2 ? m1 : m2;
    return r + 1;
  }

  matches(round: number) : Match[] {
    let depth = this.maxRounds() - round - 1;
    let pool : Match[] = [this.tournament.rootMatch];
    let pool2 : Match[] = [];
    for(let i = 0; i < depth; i++) {
      pool.forEach(match => {
        if(match.submatch1) {
          pool2.push(match.submatch1);
        }
        if(match.submatch2) {
          pool2.push(match.submatch2);
        }
      })
      pool = pool2;
      pool2 = [];
    }
    for(let i = pool.length; i < this.maxMatchesInRound(round); i++) {
      pool.push(null);
    }
    return pool;
  }

  maxMatchesInRound(round: number) {
    return Math.round(Math.pow(2, this.maxRounds() - round - 1));
  }

  range(max : number) {
    let result = [];
    for(let i = 0; i < max; i++) {
      result.push(i);
    }
    return result;
  }

  setWinner(match: Match, winner: User) {
    this.tournamentService.winner(this.tournament.id, match.id, winner.email).subscribe();
  }

  isInMatch(match: Match) {
    return (match.player1 && match.player1.email === this.user.email) || (match.player2 && match.player2.email == this.user.email);
  }

  didSelectWinner(match: Match) : boolean {
    if(match.player1.email == this.user.email) {
      return match.player1Selection != null;
    }
    else {
      return match.player2Selection != null;
    }
  }

  canSetAsWinner(match: Match) : boolean {
    return this.editable && !match.winner && this.isInMatch(match) && !this.didSelectWinner(match)
  }

  getSelection(match: Match) {
    if(this.user.email == match.player1.email) {
      return match.player1Selection;
    }
    else {
      return match.player2Selection;
    }
  }
}
