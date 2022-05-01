import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './shared/components/input/input.component';
import { ReceiveComponent } from './pages/receive/receive.component';
import { StorageComponent } from './pages/storage/storage.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { RobotComponent } from './pages/robot/robot.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    InputComponent,
    ReceiveComponent,
    StorageComponent,
    StatisticComponent,
    RobotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
