import { Injectable } from '@angular/core';
import * as FileUploadActions from './file-upload.action';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { equals } from '../shared/utils/ramda-functions.util';
import { ViewStatus } from '../shared/constants/status.constant';
import { Store } from '@ngrx/store';
import { FileUploadService } from './file-upload.service';

@Injectable()
export class FileUploadEffects {

  constructor(
    private actions$: Actions,
    private fileUploadService: FileUploadService,
    private store: Store,
  ) {
  }

  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileUploadActions.loadFiles),
      mergeMap(() => {
        // not initialized, load file from backend api
        return this.fileUploadService.listFiles().pipe(
          map((files) => FileUploadActions.loadFilesSuccess({ files })),
          catchError((error: { message: string }) =>
            of(FileUploadActions.loadFilesError({ error })),
          ),
        );
      }),
    ),
  );

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileUploadActions.uploadFile),
      mergeMap(({ fileName, fileData }) => {
        // not initialized, load file from backend api
        return this.fileUploadService.uploadFile(fileName, fileData).pipe(
          map(() => FileUploadActions.uploadFileSuccess({ msg: 'Upload file successfully'})),
          catchError((error: { message: string }) =>
            of(FileUploadActions.uploadFileError({ error })),
          ),
        );
      }),
    ),
  );

  getFileUrl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileUploadActions.getFileUrl),
      mergeMap(({ fileName }) => {
        // not initialized, load file from backend api
        return this.fileUploadService.getFileUrl(fileName).pipe(
          map((fileUrl) => {
            const urlString = fileUrl.toString()
            return FileUploadActions.getFileUrlSuccess({ fileUrl: urlString } )
          }),
          catchError((error: { message: string }) =>
            of(FileUploadActions.getFileUrlError({ error })),
          ),
        );
      }),
    ),
  );
}
