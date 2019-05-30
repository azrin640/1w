import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Register2Service {

  constructor(
    private http: HttpClient
  ) { }

  register(user)
  {
    return this.http.post('/api/user/registration', user)
      .pipe(
        catchError(error => throwError(error))
      )
  }
}
