import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { City } from '../models/city.model';
import { PagedResponse } from '../models/paged-response.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = '/api';

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.base}/countries`);
  }

  getCities(countryId: number, page: number, size: number): Observable<PagedResponse<City>> {
    return this.http.get<PagedResponse<City>>(`${this.base}/cities`, {
      params: { countryId, page, size }
    });
  }

  getCity(id: number): Observable<City> {
    return this.http.get<City>(`${this.base}/cities/${id}`);
  }
}
