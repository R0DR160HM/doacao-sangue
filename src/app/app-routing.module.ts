import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiveComponent } from './pages/receive/receive.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'doar',
    component: RegisterComponent
  },
  {
    path: 'retirar',
    component: ReceiveComponent
  },
  {
    path: '',
    redirectTo: 'doar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'doar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
