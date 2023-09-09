import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto, User } from '@weight-journal-app/domain';
import { environment } from '../../../environments/environment';

import { BehaviorSubject, Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

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

  login(credentials: LoginDto): Observable<any> {
    console.log('login request');
    const body = JSON.stringify(credentials);
    return this.http.post<any>(
      `${environment.API_URL}auth/login`,
      body,
      httpOptions
    ).pipe(
      tap(response => {
        const accessToken = response.results.access_token;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
        
          const user: User = response.user;
          console.log(response.user);
          this.currentUserSubject.next(user); // Update the current user
        }
      })
    );
    
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
