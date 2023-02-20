import { Items } from './../../interface/store/items';
import { Store } from './../../interface/store/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as urlApi } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  stores() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<Store>(
      `${urlApi.urlAPI}/api/v1/clinic/storekeeper/stores`,
      {
        headers: headers,
      }
    );
  }

  createItems(clinic: Items) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post<Items>(
      `${urlApi.urlAPI}/api/v1/clinic/storekeeper/items`,
      clinic,
      {
        headers: headers,
      }
    );
  }

  updateItems(clinic: Items, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put<Items>(
      `${urlApi.urlAPI}/api/v1/clinic/storekeeper/items/${id}`,
      clinic,
      {
        headers: headers,
      }
    );
  }

  deleteItems(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete<Items>(
      `${urlApi.urlAPI}/api/v1/clinic/storekeeper/items/${id}`,
      {
        headers: headers,
      }
    );
  }
}
