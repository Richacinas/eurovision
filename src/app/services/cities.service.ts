import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getCities(payload): Observable<any>{
    return this.http.get(`http://localhost:1111/cities/queryByPage?page=${payload.pageIndex}&size=${payload.pageSize}`);
  }
}
