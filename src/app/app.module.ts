import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './forms/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './forms/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './forms/home/home.component';
import { TournamentsComponent } from './forms/tournaments/tournaments.component';
import { TouramentEditComponent } from './forms/tourament-edit/tourament-edit.component';
import { TournamentComponent } from './forms/tournament/tournament.component';
import { ErrorInterceptor } from './services/error/interceptor';
import { TournamentBracketComponent } from './forms/tournament-bracket/tournament-bracket.component';
import { ConfirmDialogComponent } from './forms/confirm-dialog/confirm-dialog.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ForgotPasswordComponent } from './forms/forgot-password/forgot-password.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TournamentsComponent,
    TouramentEditComponent,
    TournamentComponent,
    TournamentBracketComponent,
    ConfirmDialogComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    GoogleMapsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
