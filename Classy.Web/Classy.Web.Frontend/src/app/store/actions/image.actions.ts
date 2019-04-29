import { createAction, union, props } from '@ngrx/store';
import { Image, FileClass, ClassyDataObject } from '@classy/store/models';
import { UploadFile } from 'ngx-file-drop';

export const receive = createAction(
  '[Image] Receive',
  props<{ file: File }>()
);

export const classifyAll = createAction(
  '[Image] Classify all',
  props<{ uploadFiles: UploadFile[] }>()
);

export const fetchClass = createAction(
  '[Image] Receive class',
  props<{ classyDataObject: ClassyDataObject }>()
);

export const assignClass = createAction(
  '[Image] Assign class',
  props<{ fileClass: FileClass }>()
);

export const getBase64 = createAction(
  '[Image] Get base64',
  props<{ image: Image }>()
)

export const sendToServer = createAction(
  '[Image] Send to server',
  props<{ file: File }>()
);

export const classificationResponse = createAction(
  '[Image] Classification response',
  props<{ fileClass: FileClass, i: number }>()
);

const all = union({
  receive,
  classifyAll,
  fetchClass,
  assignClass,
  getBase64,
  sendToServer,
  classificationResponse
});
export type ImageActionsUnion = typeof all;
