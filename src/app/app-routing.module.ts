import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiveComponent } from './pages/receive/receive.component';
import { RegisterComponent } from './pages/register/register.component';
import { RobotComponent } from './pages/robot/robot.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { StorageComponent } from './pages/storage/storage.component';

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
    path: 'estoque',
    component: StorageComponent
  },
  {
    path: 'estatisticas',
    component: StatisticComponent
  },
  {
    path: 'automacao',
    component: RobotComponent
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
