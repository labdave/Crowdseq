import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { PermissionService } from './permission.service';
import { UserPermission } from '../models/user-permission';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared.module';
import { DialogService } from '../components/dialog/dialog.service';

/**
 * Complete
 */
describe('PermissionService', () => {
  let injector;
  let permissionService: PermissionService;
  const MOCK_DATA: UserPermission[] = [
    {id: 1, codename: 'testPermission', 'name': 'Test 1'},
    {id: 2, codename: 'testPermission2', 'name': 'Test 2'},
    {id: 3, codename: 'testPermission3', 'name': 'Test 3'}
  ];

  const dialogSpy = jasmine.createSpyObj('DialogService', ['alert']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        { provide: DialogService, useValue: dialogSpy },
        PermissionService
      ]
    });
    injector = getTestBed();
    // Inject both the service-to-test and its (spy) dependencies
    permissionService = injector.get(PermissionService);
  });

  it('should be created', () => {
    expect(permissionService).toBeTruthy();
  });

  describe('#userHasPermission', () => {
    it('should return false when requested permission is blank', () => {
      expect(permissionService.userHasPermission('')).toEqual(false);
    });

    it('should return false when requested permission is undefined', () => {
      expect(permissionService.userHasPermission(undefined)).toEqual(false);
    });

    it('should return false when requested permission is null', () => {
      expect(permissionService.userHasPermission(null)).toEqual(false);
    });

    it('should return true when requested permission exists', () => {
      permissionService.userPermissionList = MOCK_DATA;
      expect(permissionService.userHasPermission('testPermission2')).toEqual(true);
    });

    it('should return false when requested permission does not exist', () => {
      permissionService.userPermissionList = MOCK_DATA;
      expect(permissionService.userHasPermission('testPermission6')).toEqual(false);
    });
  });
});
