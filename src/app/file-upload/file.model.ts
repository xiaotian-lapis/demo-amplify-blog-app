import { StorageItem } from '@aws-amplify/storage/src/types/outputs';

export enum UploadStatus {
  Initial = 'Initial',
  Uploading = 'Uploading',
  Complete = 'Complete',
  Failed = 'Failed',
}

export interface IFileUpload extends StorageItem {}
