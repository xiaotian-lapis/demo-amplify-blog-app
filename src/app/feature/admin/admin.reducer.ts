import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ViewStatus } from '../../shared/constants/status.constant';
import { createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.action';
import { equals, isNil } from 'rambda';
import { User } from '../../shared/models/user.model';

export interface IAdminState extends EntityState<User> {
  error: any;
  viewStatus: ViewStatus;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: IAdminState = adapter.getInitialState({
  error: null,
  viewStatus: ViewStatus.Initial,
});

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.loadUserList, (state) => {
    console.log('loadUserList action triggered');
    if (equals(state.viewStatus, ViewStatus.Initial)) {
      return { ...state, viewStatus: ViewStatus.Loading };
    } else {
      // if already initialized, just set view status to reloading,
      // and prevent loading user list from backend api
      return { ...state, viewStatus: ViewStatus.Reloading };
    }
  }),
  on(
    AdminActions.loadUserListSuccess,
    (state, { users }) => {
      console.log('loadUserListSuccess reducer triggered');
      return adapter.setAll(users,
        { ...state, viewStatus: ViewStatus.Success }
      );
    },
  ),
  on(
    AdminActions.loadUserListError, (state, { error }) => {
    console.log('loadUserListError reducer triggered');
    return { ...state, error: error.message, viewStatus: ViewStatus.Failure };
  }),
);
