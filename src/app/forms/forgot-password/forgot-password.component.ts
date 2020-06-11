import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  email = new FormControl();
  password = new FormControl();

  form = new FormGroup({
    email: this.email,
    password: this.password
  })

  constructor(
    private userService: UserService,
    private router: Router, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.userService);
  }

  submit() {
    if(this.form.valid) {
      this.userService.forgotPassword(this.email.value, this.password.value).subscribe(() => {
        this.snackBar.open("Please check your email for further instructions.", "Close");
        this.router.navigate(['login/']);
      });
    }
  }

}
