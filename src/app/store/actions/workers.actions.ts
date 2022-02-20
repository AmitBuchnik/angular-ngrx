import { Action } from '@ngrx/store';

import { Worker } from 'src/app/models/worker.interface';

export enum WorkersActionTypes {
  LOAD_WORKERS = '[Data] Load Workers',
  LOAD_WORKERS_SUCCESS = '[Data] Load Workers Success',
  LOAD_WORKERS_ERROR = '[Data] Load Workers Error',
  ADD_WORKER = '[Data] Add worker',
  EDIT_WORKER = '[Data] Edit worker',
}

export class WorkersAction implements Action {
  type: string;
  id: number;
  workers: Worker[];
  worker: Worker;
  error: string;
}

export class LoadWorkers implements Action {
  readonly type = WorkersActionTypes.LOAD_WORKERS;

  constructor() {
  }
}

export class LoadWorkersSuccess implements Action {
  readonly type = WorkersActionTypes.LOAD_WORKERS_SUCCESS;

  constructor(readonly workers: Worker[]) {
  }
}

export class LoadWorkersError implements Action {
  readonly type = WorkersActionTypes.LOAD_WORKERS_ERROR;

  constructor(readonly error: string) {
  }
}

export class AddWorker implements Action {
  readonly type = WorkersActionTypes.ADD_WORKER;

  constructor(readonly worker: Worker) {
  }
}

export class EditWorker implements Action {
  readonly type = WorkersActionTypes.EDIT_WORKER;

  constructor(readonly worker: Worker) {
  }
}

export type ActionsUnion = LoadWorkers
  | LoadWorkersSuccess
  | LoadWorkersError
  | AddWorker
  | EditWorker;