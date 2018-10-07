import { API_ROUTES } from './../config/api-route';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mockingUsers } from '../config/defines';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { User } from './../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /** holds all users when the app loads */
  private usersData = mockingUsers;

  /*************  Life Cycle Hooks  ***********/
  /**
   * parameters passed by angular Dependecy Injection
   * @param httpClient Help creating ajax calls to backend
   */
  constructor(private httpClient: HttpClient) {
  }

  // -------------------------------
  //     Public Functions
  // -------------------------------

  /**
   * Get All users
   */
  public getUsers(): Observable<any> {
    return this.httpClient.get(API_ROUTES.GET_USERS);
  }

  /**
   * Get Single user using user id
   * @param id User Id
   */
  public getByUserID(id: string): Observable<any> {
    return this.httpClient.get(API_ROUTES.GET_USER_BY_ID(id));
  }

  /**
   * Delete user using his UserId
   * @param userId user identifier
   */
  public deleteUser(userId: number) {
    return this.httpClient.delete(API_ROUTES.DELETE_USER_BY_ID(userId));
  }

  /**
   * Update user Information
   * @param data user data
   * @param id user identifier
   */
  public updateUser(data, id: number) {
    const user = {} as User;
    // customer.birthday = moment(data.birthday as Date).format('YYYY-MM-DD');
    // user.gender = data.gender;
    // user.lastContact = '';
    // user.name = { first: data.fname, last: data.lname };
    // user.customerID = id;
    // if (data.file) {
    //   user.customerImage = { name: data.file.name, value: data.file.value };
    // } else {
    //   user.customerImage = { name: null, value: null };
    // }
    return this.httpClient.put(API_ROUTES.UPDATE_USER, user);
  }

  /**
   * Add user to all users source or remote DB
   * @param data user data
   */
  public addUser(newUser: User) {
    // Create user object in order to add it to the source list
    const user = {} as User;
    // user.birthday = moment(data.birthday as Date).format('YYYY-MM-DD');
    // user.gender = data.gender;
    // user.lastContact = '';
    // user.name = { first: data.fname, last: data.lname };
    // if (data.file) {
    //   user.customerImage = { name: data.file.name, value: data.file.value };
    // } else {
    //   user.customerImage = { name: null, value: null };
    // }
    return this.httpClient.post(API_ROUTES.CREATE_USER, user);
  }

}
