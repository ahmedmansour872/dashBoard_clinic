import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as urlApi } from './../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  craeteDoctors(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post<any>(
      `${urlApi.urlAPI}/api/v1/clinic/admin/create-user`,
      user,
      {
        headers: headers,
      }
    );
  }
  
  updateUser(user: any, UserID: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put<any>(
      `${urlApi.urlAPI}/api/v1/clinic/admin/users/${UserID}`,
      user,
      {
        headers: headers,
      }
    );
  }
}
