// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import './polyfills';
import 'popper.js';
import 'bootstrap';
import 'bootstrap-toggle';
import 'bootstrap-table';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (module.hot)
{
    module.hot.accept();
    module.hot.dispose(() =>
    {
        modulePromise.then(appModule => appModule.destroy());
    });
}
else
{
    enableProdMode();
}

// Note: @ng-tools/webpack looks for the following expression when performing production
// builds. Don't change how this line looks, otherwise you may break tree-shaking.
const modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);