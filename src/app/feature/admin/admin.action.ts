import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export const loadUserList = createAction(
  '[Admin] Load User List',
);

export const loadUserListSuccess = createAction(
  '[Admin API] Load User List Success',
  props<{ users: User[]}>(),
);

export const loadUserListError = createAction(
  '[Admin API] Load User List Error',
  props<{ error: { message: string } }>(),
);
