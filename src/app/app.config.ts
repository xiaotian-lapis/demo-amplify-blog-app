import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideStore(),provideHttpClient(),
    provideStoreDevtools({ maxAge: 25 }),
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LcD5UMpAAAAAJD3mPyx98vfmiPylpUGUxAuwraC',
    },
    provideAnimations(),]
};
