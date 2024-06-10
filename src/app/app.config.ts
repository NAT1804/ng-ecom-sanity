import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { Meta, provideClientHydration } from '@angular/platform-browser';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '@environments/environment';

registerLocaleData(vi);

export function initIndexing(meta: Meta): () => Promise<void> {
  return async () => {
    const isProduction = environment.production === true;

    meta.removeTag('name="robots"');
    meta.addTag({
      name: 'robots',
      content: isProduction ? 'index, follow' : 'noindex, nofollow',
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNzI18n(vi_VN),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initIndexing,
      multi: true,
      deps: [Meta],
    },
  ],
};
