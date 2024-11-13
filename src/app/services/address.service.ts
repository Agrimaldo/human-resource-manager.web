import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AddressResult } from '../interfaces/address-result';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly API_URL = 'https://viacep.com.br/ws'

  constructor(private http: HttpClient) { }

  GetByZipCode(zipCode: string): Observable<AddressResult> {
    return this.http.get<AddressResult>(`${this.API_URL}/${zipCode}/json`).pipe(shareReplay(1));;
  }
}
