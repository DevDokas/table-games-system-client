import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  url: string = environment.api_url
  path: string = 'game'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/${this.path}`)
  }
}
