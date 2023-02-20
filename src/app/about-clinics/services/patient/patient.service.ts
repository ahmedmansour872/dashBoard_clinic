import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as urlApi } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatients() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(
      `${urlApi.urlAPI}/api/v1/clinic/receptionist/patient-search`,
      {
        headers: headers,
      }
    );
  }

  register(patient: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(`${urlApi.urlAPI}/api/v1/patient/register`, patient, {
      headers: headers,
    });
  }
}
