import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { get } from 'aws-amplify/api';
import { getResponseJsonFromAmplifyApi } from '../../shared/utils/amplify.util';
import { User } from '../../shared/models/user.model';
import { ListUsersResponse } from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  private apiName = 'AdminQueries';

  /**
   * Get users from AWS Amplify admin query
   */
  listUsers(): Observable<User[]> {
    return from(getResponseJsonFromAmplifyApi<ListUsersResponse>(
      this.apiName,
      '/listUsers'
    )).pipe(map(res => {
      console.log('listUsers res: ', res);
      return res.Users;
    }));
  }
}
