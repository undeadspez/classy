import {
  Inject,
  Injectable,
  InjectionToken
} from '@angular/core';
import { FileClass } from '@classy/store/models';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'classy-local-storage',
  { factory: storageFactory }
);

@Injectable({
  providedIn: 'root'
})
export class ClassificationStorageService {

  private collectionKey = 'classy';

  get data() {
    return this.storage.getItem(this.collectionKey);
  }

  clear() {
    this.storage.setItem(this.collectionKey, JSON.stringify(Object()));
  }

  updateClassification({ fileName, className }: FileClass) {
    const classification = JSON.parse(this.data);
    this.storage.setItem(this.collectionKey, JSON.stringify({ ...classification, [fileName]: className }));
  }

  parseClassificationResult(res: any): FileClass {
    let fileName = Object.keys(res)[0];
    let className = res[fileName];
    return { fileName, className };
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) { }

}
