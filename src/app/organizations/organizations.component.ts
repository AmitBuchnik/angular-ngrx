import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Organization } from '../models/organization.interface';
import { AppState } from '../store/reducers/app.reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { selectOrganizations } from '../store/reducers/organizations.reducers';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  organizations$: Observable<Organization[]>;

  constructor(private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrganizationsFromStore();
  }

  getOrganizationsFromStore() {
    this.organizations$ = this.store.select(selectOrganizations);
  }

  showWorkers(organizationId: number) {
    this.router.navigate(['/workers', organizationId], { relativeTo: this.route });
  }

  addWorker(organizationId: number) {
    this.router.navigate(['worker', 'new'], {
      relativeTo: this.route,
      queryParams: { organizationId: organizationId },
      queryParamsHandling: "merge"
    });
  }
}
