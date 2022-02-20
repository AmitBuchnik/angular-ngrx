import { Action } from '@ngrx/store';

export enum DataActionTypes {
  LOAD_DATA = '[Data] Load Data',
}

export class DataAction implements Action {
  type: string;
}

export class LoadData implements Action {
  readonly type = DataActionTypes.LOAD_DATA;

  constructor() {
  }
}

export type ActionsUnion = LoadData;