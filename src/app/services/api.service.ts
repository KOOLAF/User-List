import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(page: number): Observable<User[]> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.httpClient.get<User[]>(
      `https://reqres.in/api/users?page=${page}`,
      { headers }
    );
  }

  getUserById(id: number): Observable<User> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.httpClient.get<User>(`https://reqres.in/api/users/${id}`, {
      headers,
    });
  }
}
