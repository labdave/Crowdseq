import { Affiliation } from './affiliation';
import { UserPermission } from './user-permission';
import { UserInfo } from './user-info';

export class AuthGroup {
    id: number;
    name: string;
    affiliation: Affiliation;

    permissions: UserPermission[];
    user_set: UserInfo[];
}
