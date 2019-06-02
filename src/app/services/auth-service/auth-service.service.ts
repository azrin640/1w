import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from 'app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) { }

  get currentUser(): User
  {
    let user: User = this.jwtHelper.decodeToken();
    if(user) return user;
    else return null;

  }

  get currentUserProfile()
  {
    let profile: User = this.user;
    return profile;
  }

  getUserProfile()
  {    
    var profile;
    var user;

    if(this.user && this.user._id) {
      profile  = this.user;
    }
    else { 
      user = this.currentUser;
      profile = this.http.post('/api/user/profile', {_id: user._id})
        .pipe(catchError(error => throwError(error)));
    }

    return profile;

  }

}
