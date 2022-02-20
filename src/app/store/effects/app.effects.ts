import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, switchMap, catchError, filter, withLatestFrom, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers/app.reducers';
import { WorkersActionTypes } from '../actions/workers.actions';
import { DataActionTypes, LoadData } from '../actions/data.actions';
import * as organizationsActions from '../actions/organizations.actions';
import * as workersActions from '../actions/workers.actions';
import { OrganizationsActionTypes } from '../actions/organizations.actions';
import { Organization } from 'src/app/models/organization.interface';
import { Worker } from 'src/app/models/worker.interface';

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<AppState>) { }

  @Effect()
  loadData$ = this.actions$
    .pipe(
      ofType<LoadData>(DataActionTypes.LOAD_DATA),
      switchMap((action: LoadData) => {
        return [new workersActions.LoadWorkers(), new organizationsActions.LoadOrganizations()]
      })
    );

  @Effect()
  loadOrganizations$ = this.actions$
    .pipe(
      ofType<organizationsActions.LoadOrganizations>(OrganizationsActionTypes.LOAD_ORGANIZATIONS),
      switchMap((action: organizationsActions.LoadOrganizations) => {
        return this.httpClient.get<Organization[]>('assets/organizations.json')
          .pipe(shareReplay(1));
      }), map((data) => {
        return (new organizationsActions.LoadOrganizationsSuccess(data));
      }),
      catchError((err) => {
        return of(new organizationsActions.LoadOrganizationsError(err));
      }));

  @Effect()
  loadWorkers$ = this.actions$
    .pipe(
      ofType<workersActions.LoadWorkers>(WorkersActionTypes.LOAD_WORKERS),
      switchMap((action: workersActions.LoadWorkers) => {
        return this.httpClient.get<Worker[]>('assets/workers.json')
          .pipe(shareReplay(1));
      }), map((workers) => {
        return (new workersActions.LoadWorkersSuccess(workers));
      }),
      catchError((err) => {
        return of(new workersActions.LoadWorkersError(err));
      }));
}
