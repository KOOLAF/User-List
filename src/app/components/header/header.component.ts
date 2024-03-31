import { Component } from '@angular/core';
import { UserService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchInput: string = '';

  constructor(private userService: UserService) {}

  onSearchChange(): void {
    const userId = parseInt(this.searchInput, 10);
    this.userService.findUserById(userId);
  }
}
