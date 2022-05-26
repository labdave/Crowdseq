import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { environment } from '../../../environments/environment';
import { MockAnnotationData } from './mock-annotation-data';

@Injectable()
export class AnnotationService {

  constructor(private _http: HttpClient, private dialogService: DialogService) { }


  getAnnotations(page_size: number, page: number, tierList: string[], searchTerm: string) {
    // const href = environment.apiBase + '/variants/';
    // let requestUrl = `${href}?page_size=${page_size}&page=${page + 1}`;
    // for ( const tier of tierList ) {
    //   requestUrl += `&annotations__tier=${tier}`;
    // }
    // if ( searchTerm && searchTerm.length > 0) {
    //   requestUrl += `&search=${searchTerm}`;
    // }
    // return this._http.get<any>(requestUrl);
    return of(MockAnnotationData.ANNOTATION_DATA); // return cached user info
  }

  public saveAnnotation(annotation: any) {
    const endpoint = annotation.hasOwnProperty("gene") ? '/gene-annotations/': '/aa-annotations/'
    return this._http.post<any>(environment.apiBase + endpoint, annotation);
  }

  public uploadAnnotationData(formData: any) {
    return this._http.post<any>(environment.apiBase + '/annotation-data-upload/', formData);
  }
}
