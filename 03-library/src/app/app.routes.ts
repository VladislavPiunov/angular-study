import { Routes } from '@angular/router';
import { Library } from './features/library/library';

export const routes: Routes = [
  { path: 'library', component: Library },
  { path: '', redirectTo: 'library', pathMatch: 'full' },
];