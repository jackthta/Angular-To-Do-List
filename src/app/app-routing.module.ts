import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';
import { ToDoListComponent } from './to-do/general-to-do/to-do-list/to-do-list.component';
import { LoginComponent } from './auth/login/login.component';
import { ToDoHistoryComponent } from './to-do/finished-to-do/to-do-history/to-do-history.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: ToDoListComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'to-do-history', component: ToDoHistoryComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
