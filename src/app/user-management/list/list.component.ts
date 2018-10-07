import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'es-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /** holds all the user in the system */
  public users = null;

  /*************  Life Cycle Hooks  ***********/
  /**
  * parameters passed by angular Dependency Injection
  * @param usersService  contains the CRUD operation to handle users data
  */
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.updateUsersList();
  }


  // -------------------------------
  //     Public Functions
  // -------------------------------

  /**
   * Get All user to be displayed
   */
  public updateUsersList() {
    this.usersService.getUsers().subscribe((users: Array<User>) => {
      this.users = users;
    });
  }

}
