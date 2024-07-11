import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { WaiterDashboardComponent } from './waiter-dashboard/waiter-dashboard.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'owner-dashboard', component: OwnerDashboardComponent },
  { path: 'waiter-dashboard', component: WaiterDashboardComponent },
];
