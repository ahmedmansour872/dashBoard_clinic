import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as urlApi } from './../../../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ClinicsService {
  constructor(private http: HttpClient) {}

  getClinics() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<any>(`${urlApi.urlAPI}/api/v1/super-admin/clinics`, {
      headers: headers,
    });
  }

  getOneClinic(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<any>(
      `${urlApi.urlAPI}/api/v1/super-admin/clinics/${id}`,
      {
        headers: headers,
      }
    );
  }
}
