import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { createTranslateLoader} from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
  withRouterConfig
}
  from '@angular/router';

import {routes} from './app/app.routes';
import {HttpClient, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(
        routes,
        withPreloading(PreloadAllModules),
        // withDebugTracing(), //DEBUGGER
        ),
      provideHttpClient(withFetch()),
      TranslateService,
      importProvidersFrom(
        HttpClientModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        })
      ), provideAnimationsAsync(), provideAnimationsAsync(),
    ],
  },
).catch((err) => console.error(err));
