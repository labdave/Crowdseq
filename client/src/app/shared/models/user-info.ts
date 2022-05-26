import { UserPermission } from './user-permission';
import { Affiliation } from './affiliation';
import { AuthGroup } from './auth-group';

export class UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  affiliation_id: Affiliation;
  full_name: string;
  permissions: UserPermission[];
  groups: AuthGroup[];
  institution: string;
  analysis_tour: boolean;
  patient_details_tour: boolean;
  patient_list_tour: boolean;
  sample_list_tour: boolean;

  constructor() { }
}
