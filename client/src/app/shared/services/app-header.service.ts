import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppHeaderService {

  private _header: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public headerEmmiter: Observable<string> = this._header.asObservable();

  constructor() { }

  setHeader(header: string) {
    this._header.next(header);
  }
}
