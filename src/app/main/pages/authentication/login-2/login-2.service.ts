import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Login2Service {

  constructor(
    private http: HttpClient
  ) { }

  authenticate(auth)
  {
    return this.http.post('/api/user/authenticate', auth)
      .pipe(
        catchError(error => throwError(error))
      )
  }

  login(auth)
  {
    return this.http.post('/api/user/login', auth)
      .pipe(
        catchError(error => throwError(error))
      )

  }
}
