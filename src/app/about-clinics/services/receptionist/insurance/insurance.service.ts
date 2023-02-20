import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as urlApi } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  constructor(private http: HttpClient) {}

  company() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(
      `${urlApi.urlAPI}/api/v1/clinic/receptionist/insurance-companies`,
      {
        headers: headers,
      }
    );
  }

  createCompany(campany: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const fData = new FormData();
    console.log(campany);
    console.log(campany.file);

    fData.append('file', campany.file);
    fData.append('code', campany.code);
    fData.append('name', campany.name);
    fData.append('description', campany.description);

    console.log(fData.getAll('file'));

    // return this.http.post(
    //   `${urlApi.urlAPI}/api/v1/clinic/receptionist/insurance-companies`,
    //   fData,
    //   {
    //     headers: headers,
    //   }
    // );

    let url = `${
      urlApi.urlAPI
    }/api/v1/clinic/receptionist/insurance-companies?token=${localStorage.getItem(
      'token'
    )}`;
    return this.http.post<any>(url, fData);
  }

  updateCompany(campany: any, campId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put(
      `${urlApi.urlAPI}/api/v1/clinic/receptionist/insurance-companies/${campId}`,
      campany,
      {
        headers: headers,
      }
    );
  }

  deleteCompany(campId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(
      `${urlApi.urlAPI}/api/v1/clinic/receptionist/insurance-companies/${campId}`,
      {
        headers: headers,
      }
    );
  }
}
