import {
  Action,
  createSelector,
} from '@ngrx/store';

import { Worker } from 'src/app/models/worker.interface';
import { WorkersActionTypes } from '../actions/workers.actions';

import * as workersActions from '../actions/workers.actions';
import { AppState } from './app.reducers';

export interface IState {
  workers: Worker[];
  error: string | null;
}

const initialDataState: IState = {
  workers: [],
  error: null,
};

export function workersReducer(state: IState = initialDataState, action: Action) {
  const dataAction = action as workersActions.WorkersAction;

  switch (dataAction.type) {

    case WorkersActionTypes.LOAD_WORKERS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        workers: dataAction.workers,
        error: null
      });

    case WorkersActionTypes.LOAD_WORKERS_ERROR:
      return Object.assign({}, state, { data: null, error: dataAction.error });

    case WorkersActionTypes.ADD_WORKER:
      return Object.assign({}, state, {
        ...state,
        workers: [...state.workers, dataAction.worker]
      });

    case WorkersActionTypes.EDIT_WORKER:
      const workers = [...state.workers];

      if (state.workers) {
        const index = state.workers.findIndex(w => w.id == dataAction.worker?.id);

        const updatedWorker = {
          ...state.workers[index],
          ...dataAction.worker
        };

        workers[index] = updatedWorker;
      }

      return {
        ...state,
        workers: workers,
        error: null
      };

    default:
      return state;
  }
}

export const selectWorkers = (state: AppState) => state.workers.workers;

export const selectWorkersError = (state: AppState) => state.workers.error;

export const getWorkersByOrganizationId = (organizationId: number) => createSelector(selectWorkers, (allWorkers) => {
  return allWorkers?.filter(worker => {
    return worker?.organizationId === organizationId;
  });
});

export const getWorkerById = (id: number | string) => createSelector(selectWorkers, (allWorkers) => {
  return allWorkers?.find(worker => {
    return worker?.id == id;
  });
});


