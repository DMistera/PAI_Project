import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$: Observable<User>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.currentUser();
  }

  navigate(destination: string, param ?: string) {
    let path = param ? [destination, param] : [destination];
    this.router.navigate(path, {relativeTo: this.activatedRoute});
  }

  logout() {
    this.router.navigate(["login"]);
  }

}
