import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers/app.reducers';
import { Organization } from '../models/organization.interface';
import { Worker } from '../models/worker.interface';
import { AddWorker, EditWorker } from '../store/actions/workers.actions';
import * as appReducers from '../store/reducers/app.reducers';
import { Subscription } from 'rxjs';

export enum Mode {
  create = "create",
  update = "update"
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  title: string;
  display = false;

  id: number | string;
  organizationId: number;

  reactiveForm: FormGroup;
  organizations: Organization[] | null;
  worker: Worker | undefined;

  Mode = Mode;
  mode: Mode;

  storeSubscription: Subscription;

  constructor(private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location) { }

  ngOnInit(): void {
    this.display = true;
    this.initForm()
    this.initRoutingParams();
  }

  initRoutingParams() {
    this.id = this.route.snapshot.params['id'];
    this.organizationId = +this.route.snapshot.queryParams['organizationId'];

    this.storeSubscription = this.store.select(appReducers.getWorkerAndOrganizations(this.id))
      .subscribe((data) => {
        this.organizations = data.organizations;
        this.worker = data.worker;

        if (this.id == 'new') {
          this.title = 'Add worker';
          this.mode = Mode.create;

          this.reactiveForm.patchValue({
            organization: this.organizations?.find(o => o.id == this.organizationId)
          });
        } else {
          this.title = 'Edit worker';
          this.mode = Mode.update;

          this.reactiveForm.patchValue({
            name: this.worker?.name,
            lastName: this.worker?.lastName,
            organization: this.organizations?.find(o => o.id == this.worker?.organizationId)
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  initForm() {
    let controlConfig = this.getControlConfig();
    this.reactiveForm = this.fb.group(controlConfig, {
      validators: []
    });
  }

  getControlConfig(): any {
    let config = {
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      organization: [null, [Validators.required]],
    };
    return config;
  }

  onCloseDialog() {
    this.location.back();
  }

  onCancel() {
    this.onCloseDialog();
  }

  onSubmit() {
    let worker = {
      id: this.mode == Mode.create ? this.generateId() : this.worker?.id,
      name: this.reactiveForm.value.name,
      lastName: this.reactiveForm.value.lastName,
      organizationId: this.reactiveForm.value.organization.id
    };

    if (this.mode == Mode.create) {
      this.store.dispatch(new AddWorker(worker));
    } else {
      this.store.dispatch(new EditWorker(worker));
    }
    this.onCloseDialog();
  }

  generateId() {
    return Math.random() * 1000001;
  }
}
