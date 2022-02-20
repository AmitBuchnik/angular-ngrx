import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Worker } from '../models/worker.interface';
import { AppState } from '../store/reducers/app.reducers';
import { getWorkersByOrganizationId } from '../store/reducers/workers.reducers';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  workers$: Observable<Worker[]>;

  constructor(private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const organizationId = +this.route.snapshot.params['id'];
    // this.store.dispatch(new LoadWorkers(organizationId));
    this.workers$ = this.store.select(getWorkersByOrganizationId(organizationId));
  }

  edit(worker: Worker) {
    this.router.navigate(['worker', worker?.id], { relativeTo: this.route });
  }
}
