import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'app/services/auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileEditService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getUserProfile()
  {    
    let user = this.authService.currentUser;

    if(user){

      return this.http.post('/api/user/profile', {_id: user._id})
        .pipe(catchError(error => throwError(error)));

    }
    else return null;    
  }

  editUserProfile(user)
  {
    return this.http.post('/api/user/profile/edit', user)
      .pipe(catchError(error => throwError(error)));
  }
}
