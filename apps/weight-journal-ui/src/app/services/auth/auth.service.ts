import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@weight-journal-app/domain';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  

  constructor(private http: HttpClient) {}

  //register request.
  register(user: User): Observable<any> {
    console.log('register request');
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<any>(
      `${environment.API_URL}auth/register`,
      body,
      httpOptions
    );
  }
}
