import { Component, /* ... other imports */ } from '@angular/core';
import { User } from '../../models/users';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/shared.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: User[] = [];
  page: any = 1;
  foundUser: User | null = null;
  isLoading: boolean = false; 

  constructor(
    private api: ApiService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userService.foundUser$.subscribe((user) => {
      this.foundUser = user;
    });
  }

  loadUsers() {
    this.isLoading = true;  
    this.api.getAllUsers(this.page).subscribe(
      (response) => {
        this.users = (response as any).data;
        this.userService.setUsers(this.users);
        this.isLoading = false;  
      },
      (error) => {
        
        this.isLoading = false;  
      }
    );
  }

  detail(id: any) {
    this.router.navigateByUrl(`/details/${id}`);
  }

  nextPage(): void {
    if (this.page == 1) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}