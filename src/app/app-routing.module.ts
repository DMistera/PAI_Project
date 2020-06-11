import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { HomeComponent } from './forms/home/home.component';
import { TournamentsComponent } from './forms/tournaments/tournaments.component';
import { TouramentEditComponent } from './forms/tourament-edit/tourament-edit.component';
import { TournamentComponent } from './forms/tournament/tournament.component';
import { ForgotPasswordComponent } from './forms/forgot-password/forgot-password.component';


const routes: Routes = [
  {path: "home", component: HomeComponent, children: [
    {path: "tournaments", component: TournamentsComponent},
    {path: "tournament-edit/:id", component: TouramentEditComponent},
    {path: "tournament/:id", component: TournamentComponent},
    {path: "**", redirectTo: "tournaments", pathMatch: 'full'}
  ]},

  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "forgot-password", component: ForgotPasswordComponent},

  {path: "**", redirectTo: "login", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
