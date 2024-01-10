import { createAction, props } from '@ngrx/store';

export const loadFiles = createAction('[File] Load Files');

export const loadFilesSuccess = createAction(
  '[File API] Load Files Success',
  props<{ files: any[] }>(),
);

export const loadFilesError = createAction(
  '[File API] Load Files Error',
  props<{ error: { message: string } }>(),
);

export const uploadFile = createAction(
  '[File] Upload File',
  props<{
    fileName: string;
    fileData: any;
  }>(),
);

export const uploadFileSuccess = createAction(
  '[File API] Upload File Success',
  props<{ msg: string }>(),
);

export const uploadFileError = createAction(
  '[File API] Upload File Error',
  props<{ error: { message: string } }>(),
);

export const getFileUrl = createAction(
  '[File] Get File Url',
  props<{
    fileName: string;
  }>(),
);

export const getFileUrlSuccess = createAction(
  '[File API] Get File Url Success',
  props<{ fileUrl: string }>(),
);

export const getFileUrlError = createAction(
  '[File API] Get File Url Error',
  props<{ error: { message: string } }>(),
);
