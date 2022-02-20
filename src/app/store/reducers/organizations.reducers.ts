import { Organization } from 'src/app/models/organization.interface';
import { OrganizationsAction, OrganizationsActionTypes } from '../actions/organizations.actions';
import * as organizationsActions from '../actions/organizations.actions';
import { AppState } from './app.reducers';
import { Action } from '@ngrx/store';

export interface IState {
  organizations: Organization[];
  error: string | null;
}

const initialDataState: IState = {
  organizations: [],
  error: null,
};


export function organizationsReducer(state: IState = initialDataState, action: Action) {
  const dataAction = action as organizationsActions.OrganizationsAction;

  switch (action.type) {

    case OrganizationsActionTypes.LOAD_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        organizations: dataAction.organizations,
        error: null
      });

    case OrganizationsActionTypes.LOAD_ORGANIZATIONS_ERROR:
      return Object.assign({}, state, { data: null, error: dataAction.error });

    default:
      return state;
  }
}

export const selectOrganizations = (state: AppState) => state.organizations.organizations;

export const selectOrganizationsError = (state: AppState) => state.organizations.error;

