// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();
  private foundUserSubject = new BehaviorSubject<User | null>(null);
  public foundUser$ = this.foundUserSubject.asObservable();

  constructor() {}

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  findUserById(id: any): void {
    const users = this.usersSubject.getValue();
    const user = users.find((user) => user.id == id);
    this.foundUserSubject.next(user || null);
  }
}
