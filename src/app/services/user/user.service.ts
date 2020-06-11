import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User) : Observable<HttpResponse<Object>> {
    return this.http.post("api/user/login", user, {observe: 'response'});
  }

  register(user: User) : Observable<HttpResponse<Object>> {
    return this.http.post("api/user/register", user, {observe: 'response'});
  }

  forgotPassword(email: string, pass: string) : Observable<HttpResponse<Object>> {
    return this.http.post("api/user/password/" + email, pass, {observe: 'response'});
  }

  currentUser() : Observable<User> {
    return this.http.get<User>("api/user/current");
  }

}
