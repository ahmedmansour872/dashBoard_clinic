import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../../interface/users';
import { environment as urlApi } from './../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  constructor(private http: HttpClient) {}

  getInfoAboutClinics() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<Users>(`${urlApi.urlAPI}/api/v1/super-admin/users`, {
      headers: headers,
    });
  }

  createUser(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post<any>(
      `${urlApi.urlAPI}/api/v1/super-admin/create-admin`,
      user,
      {
        headers: headers,
      }
    );
  }

  editUser(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put<any>(
      `${urlApi.urlAPI}/api/v1/super-admin/update-admin/:admin`,
      user,
      {
        headers: headers,
      }
    );
  }
}
