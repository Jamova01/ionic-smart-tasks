import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  addOutline,
  arrowForward,
  briefcaseOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  checkmarkOutline,
  chevronDownOutline,
  chevronUpOutline,
  clipboardOutline,
  closeOutline,
  colorPaletteOutline,
  createOutline,
  eyeOutline,
  funnelOutline,
  hourglassOutline,
  listOutline,
  pricetagOutline,
  timeOutline,
  trashOutline,
} from 'ionicons/icons';

import { routes } from './app.routes';

addIcons({
  'add-circle-outline': addCircleOutline,
  'add-outline': addOutline,
  'arrow-forward': arrowForward,
  'briefcase-outline': briefcaseOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'checkmark-outline': checkmarkOutline,
  'chevron-down-outline': chevronDownOutline,
  'chevron-up-outline': chevronUpOutline,
  'clipboard-outline': clipboardOutline,
  'close-outline': closeOutline,
  'color-palette-outline': colorPaletteOutline,
  'create-outline': createOutline,
  'eye-outline': eyeOutline,
  'funnel-outline': funnelOutline,
  'hourglass-outline': hourglassOutline,
  'list-outline': listOutline,
  'pricetag-outline': pricetagOutline,
  'time-outline': timeOutline,
  'trash-outline': trashOutline,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIonicAngular({ mode: 'md' }),
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
};
