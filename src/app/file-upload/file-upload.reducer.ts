import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IFileUpload, UploadStatus } from './file.model';
import { ViewStatus } from '../shared/constants/status.constant';

export interface IFileUploadState extends EntityState<IFileUpload> {
  error: any;
  viewStatus: ViewStatus;
  uploadStatus: UploadStatus;
}

export const adapter: EntityAdapter<IFileUpload> =
  createEntityAdapter<IFileUpload>();

export const initialState: IFileUploadState = adapter.getInitialState({
  error: null,
  viewStatus: ViewStatus.Initial,
  uploadStatus: UploadStatus.Initial,
});


