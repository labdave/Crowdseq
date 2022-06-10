import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AaChangeService {

  constructor(private _http: HttpClient, private dialogService: DialogService) { }

  public getAminoAcidByShortName(shortName: string) {
    return this._http.get<any>(environment.apiBase + '/aa-changes/short_name/' + shortName + '/');
  }
}
