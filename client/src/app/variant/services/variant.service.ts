import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class VariantService {

  constructor(private _http: HttpClient, private dialogService: DialogService) { }

  public getVariantCPRA(cpra: string) {
    return this._http.get<any>(environment.apiBase + '/variants/cpra/' + cpra + '/');
  }
}
