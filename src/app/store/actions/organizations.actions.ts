import { Action } from '@ngrx/store';

import { Organization } from 'src/app/models/organization.interface';

export enum OrganizationsActionTypes {
  LOAD_ORGANIZATIONS = '[Data] Load Organizations',
  LOAD_ORGANIZATIONS_SUCCESS = '[Data] Load Organizations Success',
  LOAD_ORGANIZATIONS_ERROR = '[Data] Load Organizations Error',
}

export class OrganizationsAction implements Action {
  type: string;
  id: number;
  organizations: Organization[]
  error: string;
}

export class LoadOrganizations implements Action {
  readonly type = OrganizationsActionTypes.LOAD_ORGANIZATIONS;

  constructor() {
  }
}

export class LoadOrganizationsSuccess implements Action {
  readonly type = OrganizationsActionTypes.LOAD_ORGANIZATIONS_SUCCESS;

  constructor(readonly organizations: Organization[]) {
  }
}

export class LoadOrganizationsError implements Action {
  readonly type = OrganizationsActionTypes.LOAD_ORGANIZATIONS_ERROR;

  constructor(readonly error: string) {
  }
}

export type ActionsUnion = LoadOrganizations
  | LoadOrganizationsSuccess
  | LoadOrganizationsError;