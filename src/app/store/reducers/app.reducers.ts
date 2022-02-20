import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';

import * as organizationsReducers from './organizations.reducers';
import * as workersReducers from './workers.reducers';

export interface AppState {
  organizations: organizationsReducers.IState,
  workers: workersReducers.IState,
}

export const reducers: ActionReducerMap<AppState> = {
  organizations: organizationsReducers.organizationsReducer,
  workers: workersReducers.workersReducer
};

export const getWorkerAndOrganizations = (workerId: number | string) => createSelector(
  workersReducers.selectWorkers,
  organizationsReducers.selectOrganizations,
  (workers, organizations) => {
    const worker = workers?.find(w => w.id == workerId);
    return {
      worker,
      organizations
    };
  }
)

// export const getWorkersAndOrganizations = () => createSelector(
//   selectWorkers,
//   selectOrganizations,
//   (workers, organizations) => {
//     return {
//       workers,
//       organizations
//     };
//   }
// )

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
