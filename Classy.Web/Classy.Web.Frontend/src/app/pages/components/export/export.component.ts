import { image2classyDataObject } from './../../../store/models/image.model';
import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { ImageActions } from '@classy/store/actions';
import { User, ClassyDataObject } from '@classy/store/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

  API_PATH = environment.API_PATH;

  user$ = this.store.pipe(select(fromRoot.getUserState));
  images$ = this.store.pipe(select(fromRoot.getImagesState));

  user: User;
  classyDataObjects: ClassyDataObject[];

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.user$.subscribe(user => this.user = user);

    this.images$.pipe(
      map(images => images.map(image2classyDataObject))
    ).subscribe(classyDataObjects => {
      this.classyDataObjects = classyDataObjects;
      console.log(JSON.stringify(this.classyDataObjects));
    });
  }

  exportToMyComputer() {
    console.log('Exporting to My Computer...');
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(`${this.API_PATH}/export/${this.user.id}`,
      JSON.stringify(this.classyDataObjects),
      { headers: headers, responseType: 'blob' })
      .subscribe(res => {
        console.log(res);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(res);
        link.download = "classified_images.zip";
        link.click();
      })
      .add(() => {
        //this.store.dispatch(ImageActions.clearClassificationStorage());
      });
  }

  exportToGoogleDrive() {
    console.log('Exporting to Google Drive...');
  }

  exportToDropbox() {
    console.log('Exporting to Dropbox...');
  }
}
