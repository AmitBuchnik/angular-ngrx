import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PrimeNGConfig } from 'primeng/api';
import { LoadData } from './store/actions/data.actions';
import { AppState } from './store/reducers/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.store.dispatch(new LoadData());
  }
}
