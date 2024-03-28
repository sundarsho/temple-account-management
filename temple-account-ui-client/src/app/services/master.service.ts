import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/userdetails.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  GetUsers():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8080/temple/v1/users");
  }

}
