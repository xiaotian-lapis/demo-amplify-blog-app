import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AdminService } from './admin.service';
import * as AdminActions from './admin.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AdminEffects {

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private store: Store
  ) {
  }

  loadUserList$ = createEffect(() => (
    this.actions$.pipe(
      ofType(AdminActions.loadUserList),
      mergeMap(() =>
        this.adminService.listUsers().pipe(
          map((users) => AdminActions.loadUserListSuccess({ users })),
          catchError((error: { message: string }) =>
            of(AdminActions.loadUserListError({ error }))
          )
        ))
    )
  ));
}
