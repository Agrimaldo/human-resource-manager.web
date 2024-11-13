import { Routes } from '@angular/router';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthorizedComponent } from './layouts/authorized/authorized.component';
import { BusinessConfigComponent } from './pages/business-config/business-config.component';
import { BusinessComponent } from './pages/business/business.component';

export const routes: Routes = [
  {
    path: '',
    component: UnauthorizedComponent,
    children: [
      { path: '', component: RegisterComponent }
    ]
  },
  {
    path: 'dashboard',
    component: AuthorizedComponent,
    children: [
      { path: '', component: BusinessComponent },
      { path: 'business-config', component: BusinessConfigComponent }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '' }
];
