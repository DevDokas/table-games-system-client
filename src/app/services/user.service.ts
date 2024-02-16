import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.api_url
  path: string = 'user'

  constructor(
    private http: HttpClient
  ) { }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${this.path}/${id}`)
  }

  login(body: any): Observable<any> {
    const requisition = this.http.post(`${this.url}/${this.path}/login`, body)
    return requisition;
  }

  register(body: any): Observable<any> {
    return this.http.post(`${this.url}/${this.path}/register`, body)
  }
}
