import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FateBasicService {

  url: string = environment.api_url
  path: string = 'fate-basic'

  constructor(private http: HttpClient) { }

  create(body: any): Observable<any> {
    return this.http.post(`${this.url}/${this.path}/create-char`, body)
  }

  getAllByUserId(user_id: string): Observable<any> {
    return this.http.get(`${this.url}/${this.path}/${user_id}`)
  }

  getCharById(char_id: string): Observable<any> {
    return this.http.get(`${this.url}/${this.path}/char/${char_id}`)
  }
}
