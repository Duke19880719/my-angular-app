import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard-component/dashboard-component';
import { LoginComponent } from './login-component/login-component';
import { RecordAdd } from './record-add/record-add';
import { RecordEdit } from './record-edit/record-edit';
import { RecordList } from './record-list/record-list';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },//測試用，要記得改回 login
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'record-add', component: RecordAdd },
  // { path: 'record-edit', component: RecordEdit },
  { path: 'record-list', component: RecordList ,runGuardsAndResolvers: 'always' },
  // 強制每次進入路由都重新解析},
  { path: '**', redirectTo: 'login' } // 或導向 login 或 404
];


