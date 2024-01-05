import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap, throwError } from 'rxjs';
import { getResponseJsonFromAmplifyApi } from '../../shared/utils/amplify.util';
import { User } from '../../shared/models/user.model';
import { ListUsersResponse } from './admin.model';
import { fetchAuthSession } from 'aws-amplify/auth';

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
    return from(fetchAuthSession()).pipe(
      switchMap(session => {
        const accessToken = `${session.tokens?.accessToken.payload}`;
        return getResponseJsonFromAmplifyApi<ListUsersResponse>(
          this.apiName,
          '/listUsers',
          accessToken
        );
      }),
      map(res => {
        console.log('listUsers res: ', res);
        return res.Users;
      })
    );
  }
}
