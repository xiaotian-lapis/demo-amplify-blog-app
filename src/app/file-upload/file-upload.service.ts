import { Injectable } from '@angular/core';
import { getUrl, list, uploadData } from 'aws-amplify/storage';
import { from, map, Observable } from 'rxjs';
import { StorageItem } from '@aws-amplify/storage/src/types/outputs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() {
  }

  public uploadFile(fileName: string, fileData: any): Observable<any> {
    return from(this.__uploadFile(fileName, fileData));
  }

  public getFileUrl(fileName: string): Observable<URL> {
    return from(this.__getFileUrl(fileName)).pipe(
      map(getUrlOutput => {
        return getUrlOutput.url;
      })
    );
  }

  public listFiles(prefix: string): Observable<StorageItem[]> {
    return from(this.__listFiles(prefix)).pipe(
      map(listOutput => {
        if (listOutput) {
          return listOutput.items;
        } else {
          return [];
        }
      })
    );
  }

  private async __uploadFile(fileName: string, fileData: any) {
    try {
      const result = await uploadData({
        key: fileName,
        data: fileData
      }).result;

      console.log('Succeed uploading file: ', result);
    } catch (e) {
      console.log('Error uploading file: ', e);
    }
  }

  private async __getFileUrl(fileName: string) {
    return await getUrl({ key: fileName });
  }

  private async __listFiles(prefix: string) {
    let result;
    try {
      result = await list({
        prefix: prefix
      });
    } catch (error) {
      console.log(error);
    }

    return result;
  }
}
