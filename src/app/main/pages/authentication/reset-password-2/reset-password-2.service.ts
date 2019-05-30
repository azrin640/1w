import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPassword2Service {

  constructor(
    private http: HttpClient
  ) { }

  resetPassword(user)
  {
    return this.http.post('/api/user/reset-password', user)
      .pipe(
        catchError(error => throwError(error))
      )
  }
}
