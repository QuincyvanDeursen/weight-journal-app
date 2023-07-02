import { Route } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  {
    path: 'welcome',
    pathMatch: 'full',
    component: LandingComponent,
  },
];
