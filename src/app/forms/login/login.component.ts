import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  errorMessage: String = "";

  constructor(
    private userService: UserService,
     private router: Router, 
     private activatedRoute: ActivatedRoute,
      private snackBar: MatSnackBar
      ) { }

  ngOnInit(): void {
  }

  submit() {
    let user = this.loginForm.getRawValue();
    this.userService.login(user).subscribe(response => {
      this.router.navigateByUrl('/home');
    }, error => {
      let err = error as HttpErrorResponse;
      if(err.status == 401) {
        this.errorMessage = "Username or Password is Incorrect!";
      }
      else if(err.status == 406) {
        this.errorMessage = "Account not activated! Please check your email!";
      }
      else {
        this.errorMessage = "Unknown error! Please try again later.";
      }
    })
  }

}
