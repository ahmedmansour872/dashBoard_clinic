import { Clinic } from './../../interface/clinic';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinics } from '../../interface/clinics';

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

    return this.http.get<Clinics>(
      `${urlApi.urlAPI}/api/v1/super-admin/clinics`,
      {
        headers: headers,
      }
    );
  }

  getOneClinic(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<Clinic>(
      `${urlApi.urlAPI}/api/v1/super-admin/clinics/${id}`,
      {
        headers: headers,
      }
    );
  }

  createClinic(clinic: Clinic) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post<Clinic>(
      `${urlApi.urlAPI}/api/v1/super-admin/clinics`,
      clinic,
      {
        headers: headers,
      }
    );
  }

  editClinic(clinic: Clinic, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put<Clinic>(
      `${urlApi.urlAPI}/api/v1/super-admin/clinics/${id}`,
      clinic,
      {
        headers: headers,
      }
    );
  }

  deleteClinic(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete<Clinic>(
      `${urlApi.urlAPI}/api/v1/super-admin/clinics/${id}`,
      {
        headers: headers,
      }
    );
  }
  
}
