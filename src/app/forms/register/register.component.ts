import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = new FormControl("", [Validators.required, Validators.email]);
  name = new FormControl("", Validators.required);
  surname = new FormControl("", Validators.required);
  password = new FormControl("", [Validators.required, Validators.minLength(8)]);

  registerForm = new FormGroup({
    email: this.email,
    name: this.name,
    surname: this.surname,
    password: this.password
  })

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit() {
    if(this.registerForm.valid) {
      this.userService.register(this.registerForm.getRawValue()).subscribe(response => {
        this.router.navigate(['login/']);
        this.snackBar.open("You have successfully registered! An activation email will arrive shortly!", "Close", {duration: 9999999});
      });
    }
  }
}
