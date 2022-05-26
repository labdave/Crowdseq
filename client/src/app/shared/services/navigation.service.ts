import { Injectable } from '@angular/core';

import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class NavigationService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  constructor() { }

  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }
}
