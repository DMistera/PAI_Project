import { User } from './user';
import { Match } from './match';

export class Tournament {
    id: number;
    name: string;
    maxPlayers: string;
    startDate: string;
    registrationDate: string;
    status: string;
    description: string;
    discipline: string;
    address: string;
    organizer: User;
    participants: User[];
    rootMatch: Match;
}