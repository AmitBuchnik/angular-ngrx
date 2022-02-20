import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { WorkersComponent } from './workers/workers.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'organizations'
  },
  {
    path: 'organizations',
    component: OrganizationsComponent,
    children: [
      {
        path: 'worker/:id', component: DialogComponent
      }
    ]
  },
  {
    path: 'workers/:id',
    component: WorkersComponent,
    children: [
      {
        path: 'worker/:id', component: DialogComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
