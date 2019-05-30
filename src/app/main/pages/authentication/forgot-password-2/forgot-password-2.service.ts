import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassword2Service {

  constructor(
    private http: HttpClient
  ) { }

  recoverPassword(email)
  {
    return this.http.post('/api/user/forgot-password', email)
      .pipe(
        catchError(error => throwError(error))
      )
  }
}
