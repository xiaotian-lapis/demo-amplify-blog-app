import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { ADMIN_STATE_NAME, BLOGS_STATE_NAME, PROFILE_STATE_NAME } from './shared/constants/state.constant';
import { blogReducer } from './blog/blog.reducer';
import { provideEffects } from '@ngrx/effects';
import { BlogEffects } from './blog/blog.effects';
import { profileReducer } from './profile/profile.reducer';
import { ProfileEffects } from './profile/profile.effects';
import { ProfileService } from './profile/profile.service';
import { BlogService } from './blog/blog.service';
import { AdminService } from './feature/admin/admin.service';
import { AdminEffects } from './feature/admin/admin.effects';
import { adminReducer } from './feature/admin/admin.reducer';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '',
    providers: [
      BlogService,
      provideState({
        name: BLOGS_STATE_NAME,
        reducer: blogReducer
      }),
      provideEffects([BlogEffects])
    ],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTES)
      },

      {
        path: 'blog',
        loadChildren: () =>
          import('./blog/blog.routes').then((m) => m.BLOG_ROUTES)
      }
    ]
  },

  {
    path: 'profile',
    providers: [
      ProfileService,
      provideState({
        name: PROFILE_STATE_NAME,
        reducer: profileReducer
      }),
      provideEffects([ProfileEffects])
    ],
    loadChildren: () =>
      import('./profile/profile.routes').then((m) => m.PROFILE_ROUTES)
  },

  {
    path: 'admin',
    providers: [
      AdminService,
      provideState(
        {
          name: ADMIN_STATE_NAME,
          reducer: adminReducer
        }
      ),
      provideEffects([AdminEffects])
    ],
    loadChildren: () =>
      import('./feature/admin/admin.routes').then((m) => m.ADMIN_ROUTES)
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];
