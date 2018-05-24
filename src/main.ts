import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { KeycloakService } from './app/@core/security/keycloak.service';

if (environment.production) {
  enableProdMode();
  }
  
  KeycloakService.init()
  .then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule);
  })
  .catch((reason) => {
  console.log(reason);
  window.location.reload();
  });