import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IFileUpload, UploadStatus } from './file.model';
import { ViewStatus } from '../shared/constants/status.constant';
import { createReducer, on } from '@ngrx/store';
import * as FileUploadActions from './file-upload.action';
import { equals } from '../shared/utils/ramda-functions.util';

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
  uploadStatus: UploadStatus.Initial
});

export const fileUploadReducer = createReducer(
  initialState,
  on(
    FileUploadActions.loadFiles,
    (state) => {
      console.log('loadFiles action triggered');
      if (equals(state.viewStatus, ViewStatus.Initial)) {
        return { ...state, viewStatus: ViewStatus.Loading };
      } else {
        // if already initialized, just set view status to reloading,
        // and prevent loading blogs from backend api
        return { ...state, viewStatus: ViewStatus.Reloading };
      }
    }
  ),
  on(
    FileUploadActions.loadFilesSuccess,
    (state, { files }) => {
      console.log('loadFilesSuccess action triggered');
      return adapter.setAll(files, { ...state, viewStatus: ViewStatus.Success });
    }
  ),
  on(
    FileUploadActions.loadFilesError,
    (state, { error }) => {
      console.log('loadFilesError action triggered');
      return { ...state, error, viewStatus: ViewStatus.Failure };
    }
  ),
  on(
    FileUploadActions.uploadFile,
    (state, { fileName, fileData }) => {
      console.log('uploadFile action triggered');
      return { ...state, uploadStatus: UploadStatus.Uploading };
    }
  ),
  on(
    FileUploadActions.uploadFileSuccess,
    (state, {msg}) => {
      console.log('uploadFileSuccess action triggered');
      return { ...state, uploadStatus: UploadStatus.Complete };
    }
  ),
  on(
    FileUploadActions.uploadFileError,
    (state, { error }) => {
      console.log('uploadFileError action triggered');
      return { ...state, uploadStatus: UploadStatus.Failed };
    }
  ),
  on(
    FileUploadActions.getFileUrl,
    (state, { fileName }) => {
      console.log('getFileUrl action triggered');
      return { ...state, uploadStatus: UploadStatus.Uploading };
    }
  ),
  on(
    FileUploadActions.getFileUrlSuccess,
    (state, { fileUrl }) => {
      console.log('getFileUrlSuccess action triggered');
      return { ...state, uploadStatus: UploadStatus.Complete };
    }
  ),
  on(
    FileUploadActions.getFileUrlError,
    (state, { error }) => {
      console.log('getFileUrlError action triggered');
      return { ...state, uploadStatus: UploadStatus.Failed };
    }
  )
);

