import { Component, inject, OnInit } from '@angular/core';
import { ViewStatus } from '../../shared/constants/status.constant';
import { IAdminState } from './admin.reducer';
import { Store } from '@ngrx/store';
import { selectAdminViewStatus, selectAllUsers } from './admin.selector';
import * as AdminActions from './admin.action';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { equals, or } from '../../shared/utils/ramda-functions.util';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatLineModule } from '@angular/material/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatProgressBarModule,
    NgIf,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatLineModule,
    DatePipe
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  protected readonly ViewStatus = ViewStatus;

  private adminStore = inject(Store<IAdminState>);
  viewStatus$ = this.adminStore.select(selectAdminViewStatus);
  userList$ = this.adminStore.select(selectAllUsers);

  ngOnInit(): void {
    // dispatch load action to load logs into store
    this.adminStore.dispatch(AdminActions.loadUserList());
  }

  protected readonly or = or;
  protected readonly equals = equals;
}
