import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'src/app/super-admin/interface/users';
import { environment as urlApi } from './../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  allUserClinic() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(`${urlApi.urlAPI}/api/v1/clinic/admin/my-clinic`, {
      headers: headers,
    });
  }

  doctors() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(
      `${urlApi.urlAPI}/api/v1/clinic/receptionist/doctors`,
      {
        headers: headers,
      }
    );
  }
}
