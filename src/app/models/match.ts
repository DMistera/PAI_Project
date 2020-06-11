import { User } from './user';

export class Match {
    id: number;
    player1: User;
    player2: User;
    submatch1: Match;
    submatch2: Match;
    winner: User;
    player1Selection: string;
    player2Selection: string;
}