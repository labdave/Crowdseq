import { Injectable } from '@angular/core';
import { UserPermission } from '../models/user-permission';
import { AuthGroup } from '../models/auth-group';
import { HttpClient } from '@angular/common/http';
import { DialogService } from '../components/dialog/dialog.service';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { UserInfo } from '../models/user-info';

@Injectable()
export class PermissionService {
  permissionList: UserPermission[];
  authGroupList: AuthGroup[];
  authGroupListChange: Subject<AuthGroup[] | null> = new Subject<AuthGroup[] | null>();

  userList: any[];
  userListChange: Subject<UserInfo[] | null> = new Subject<UserInfo[] | null>();

  selectedUser: UserInfo;
  selectedUserChange: Subject<UserInfo | null> = new Subject<UserInfo | null>();

  selectedGroup: AuthGroup;
  selectedGroupChange: Subject<AuthGroup | null> = new Subject<AuthGroup | null>();

  // current user permission list
  userPermissionList: UserPermission[];
  permissionsChanged: Subject<boolean> = new Subject<boolean>();


  deleteGroupId: number;

  constructor(private _http: HttpClient, private dialogService: DialogService) {
    this.authGroupListChange.subscribe( value => {
      this.authGroupList = value;
    });
    this.userListChange.subscribe( value => {
      this.userList = value;
    });
    this.selectedUserChange.subscribe( value => {
      this.selectedUser = value;
    });
    this.selectedGroupChange.subscribe( value => {
      this.selectedGroup = value;
    });
  }

  public setAuthGroupList(authGroupList: AuthGroup[]) {
    this.authGroupListChange.next(authGroupList);
  }

  public setUserList(userList: UserInfo[]) {
    this.userListChange.next(userList);
  }

  setSelectedUser(user: UserInfo) {
    this.selectedUserChange.next(user);
  }

  setSelectedGroup(group: AuthGroup) {
    this.selectedGroupChange.next(group);
  }

  public resetService() {
    this.permissionList = [];
    this.authGroupList = [];
    this.userList = [];
  }

  public setUserPermissionList(list: UserPermission[]) {
    this.userPermissionList = list;
    this.permissionsChanged.next(true);
  }

  /** Function that returns true if the user has the requested Permission */
  public userHasPermission(permissionName: string): boolean {
    if (permissionName && permissionName !== undefined && permissionName !== '' && this.userPermissionList && this.userPermissionList.length > 0) {
      return this.userPermissionList.filter(permission => permission.codename === permissionName).length > 0;
    }
    return false; // returns false if the permissionName is undefined or blank
  }

  public getAuthGroups(forceRefresh = false) {
    if (this.authGroupList && this.authGroupList.length > 0 && !forceRefresh) {
      return of(this.authGroupList);
    } else {
      return this._http.get<AuthGroup[]>(environment.apiBase + '/auth-groups/').pipe(
        tap(
          data => {
            this.setAuthGroupList(data);
          }, error => {
            this.dialogService.alert('Error', 'Failed to retrieve the auth group list.', null, DialogService.error);
          }
        ));
    }
  }

  public getUsers(forceRefresh = false) {
    if (this.userList && this.userList.length > 0 && !forceRefresh) {
      return of(this.userList);
    } else {
      return this._http.get<any[]>(environment.apiBase + '/user-info-list/').pipe(
        tap(
          data => {
            this.setUserList(data);
          }, error => {
            this.dialogService.alert('Error', 'Failed to retrieve the user list.', null, DialogService.error);
          }
        ));
    }
  }

  public getPermissions(forceRefresh = false) {
    if (this.permissionList && this.permissionList.length > 0 && !forceRefresh) {
      return of(this.permissionList);
    } else {
      return this._http.get<UserPermission[]>(environment.apiBase + '/auth-permissions/client-perms/').pipe(
        tap(
          data => {
            this.permissionList = data;
          }, error => {
            this.dialogService.alert('Error', 'Failed to retrieve the permission list.', null, DialogService.error);
          }
        ));
    }
  }

  public saveAuthGroup(authGroup: any) {
    if ( authGroup.id ) {
      return this._http.put<AuthGroup>(environment.apiBase + '/auth-groups/' + authGroup.id + '/', { 'name': authGroup.name, 'affiliation': authGroup.affiliation, 'permissions': authGroup.permissions, 'user_set': authGroup.user_set }).pipe(
        tap(
          data => {
            const tempList = this.authGroupList;
            const index = tempList.findIndex(value => value.id === data.id);
            tempList.splice(index, 1, data);
            this.setAuthGroupList(tempList); // reset the auth group list
            this.setSelectedGroup(data);
          }
        )
      );
    }
    return this._http.post<AuthGroup>(environment.apiBase + '/auth-groups/', { 'id': authGroup.id, 'name': authGroup.name, 'affiliation': authGroup.affiliation, 'permissions': authGroup.permissions, 'user_set': authGroup.user_set }).pipe(
      tap(
        data => {
          const tempList = this.authGroupList;
          tempList.push(data);
          this.setAuthGroupList(tempList); // reset the auth group list
        }
      )
    );
  }

  public deleteAuthGroup(groupId: any) {
    this.deleteGroupId = groupId;
    return this._http.delete<any>(environment.apiBase + '/auth-groups/' + groupId + '/').pipe(
      tap(
        data => {
          const tempList = this.authGroupList;
          const index = tempList.findIndex(value => value.id === this.deleteGroupId);
          tempList.splice(index, 1); // remove the old group
          this.deleteGroupId = null;
          this.setAuthGroupList(tempList); // reset the auth group list
          this.setSelectedGroup(null);
        }
      )
    );
  }

  public saveUserPermissions(user: any) {
    return this._http.put<UserInfo>(environment.apiBase + '/user-info/', { 'id': user.id, 'permissions': user.permissions, 'groups': user.groups }).pipe(
      tap(
        data => {
          const tempList = this.userList;
          const index = tempList.findIndex(value => value.id === data.id);
          tempList.splice(index, 1, data);
          this.setUserList(tempList); // reset the user list
          this.setSelectedUser(data);
        }
      )
    );
  }



}
