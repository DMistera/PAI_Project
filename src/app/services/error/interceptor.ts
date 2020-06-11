import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
  })
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private snackBar: MatSnackBar
    ) { 
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            this.handle(err);
            return throwError(err);
        }))
    }

    handle(err : HttpErrorResponse) {
        switch(err.status) {
            case 401:
                this.unauthorized();
                break;
            case 406:
                break;
            default:
                this.unknown(err.status);
        }
    }

    unauthorized() {
        this.router.navigate(["login"]);
        this.print("Authorization Error. Please try to log in again.");
    }

    unknown(code: number) {
        this.print(`Unknown Error: ${code}`);
    }

    print(message: string) {
        this.snackBar.open(message, "Close");
    }
}