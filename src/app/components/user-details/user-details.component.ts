import { Component } from '@angular/core';
import { User } from '../../models/users';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'], // Use 'styleUrls' instead of 'styleUrl'
})
export class UserDetailsComponent {
  user: User | null = null;
  uId: any = 0;

  constructor(
    private api: ApiService,
    private activateRouter: ActivatedRoute,
    private location: Location, 
    private router: Router
  ) {}

  ngOnInit() {
    this.activateRouter.paramMap.subscribe((params) => {
      this.uId = Number(params.get('id'));
      this.api.getUserById(this.uId).subscribe((response) => {
        this.user = (response as any).data;
        console.log(this.user);
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
 
}
