import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment as urlApi } from './../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async login(email: string, password: string) {
    let data: any = [];

    localStorage.clear();
    const promise = await new Promise<void>((resolve, reject) => {
      this.http
        .post(`${urlApi.urlAPI}/api/v1/super-admin/login`, {
          email,
          password,
        })
        .pipe(catchError((err) => this.catchAuthError(err)))
        .subscribe({
          next: (res: any) => {
            data = res;
            resolve();
          },
        });
    });
    localStorage.setItem('token', data.data.access_token);
    return data.data.access_token;
  }

  async getUser(email: string, password: string) {
    let result: any = [];
    let token: string = '';
    await this.login(email, password).then((data) => (token = data));

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const promise = await new Promise<void>((resolve, reject) => {
      this.http
        .get<any>(`${urlApi.urlAPI}/api/v1/clinic/auth`, {
          headers: headers,
        })
        .pipe(catchError((err) => this.catchAuthError(err)))
        .subscribe({
          next: (res: any) => {
            result = res;
            resolve();
          },
        });
    });
    return result.data[0];
  }

  catchAuthError(error: any): Observable<Response> {
    if (error && error.error && error.error.message) {
      console.error('' + error.error.message);
      alert('Email or Password not correct');
      // alert(error.error.message);
    } else if (error && error.message) alert(error.message);
    else alert(JSON.stringify(error));
    return error;
  }
}
