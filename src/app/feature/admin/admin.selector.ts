import { ADMIN_STATE_NAME } from '../../shared/constants/state.constant';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, IAdminState } from './admin.reducer';

export const selectAdminState =
  createFeatureSelector<IAdminState>(ADMIN_STATE_NAME);

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = adapter.getSelectors(selectAdminState);

export const selectAdminError = createSelector(
  selectAdminState,
  (state: IAdminState) => state.error,
);

export const selectAdminViewStatus = createSelector(
  selectAdminState,
  (state: IAdminState) => state.viewStatus,
);
