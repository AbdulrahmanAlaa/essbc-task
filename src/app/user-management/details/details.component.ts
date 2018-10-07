import { pages } from './../../config/pages-config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';
import { User } from './../../shared/interfaces/user';

@Component({
  selector: 'es-details',
  templateUrl: './details.component.html',
  styleUrls: []
})
export class DetailsComponent implements OnInit {
  /** holds the subscription intfo in order to be deleted to clear the memory */
  private sub: Subscription = null;

  /** holds current user data */
  public user: User = null;


  /*************  Life Cycle Hooks  ***********/
  /**
    * parameters passed by angular Dependency Injection
    * @param usersService  contains the CRUD operation to handle users data
    * @param route  contains current active route data and parameters
    * @param router  Helps and navigating between routes
    */
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    // Find the Cusomer ID from URL segment
    this.route.params.subscribe((params) => {
      // Get Single user Data
      this.sub = this.usersService.getByUserID(params['id']).subscribe(user => {
        if (user) {
          this.user = user;
          // this.user.customerImage = this.user.customerImage || { name: '', value: '' };
          // this.user.customerImage.value = this.user.customerImage.value ?
          //   this.user.customerImage.value : this.user.gender === 'm' ? 'assets/images/male.png' : 'assets/images/female.png';
        }
      }, error => this.router.navigate([pages.userManagement.path]));
    });
  }

  // -------------------------------
  //     Public Functions
  // -------------------------------
  /**
   * Remove user Data And Navigate back to list view
   */
  public removeUser() {
    this.usersService.deleteUser(this.user.id).subscribe(() => {
      this.router.navigate([pages.userManagement.path]);
    });
  }
}
