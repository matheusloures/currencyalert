import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './alert.service';
import { HttpModule } from '@angular/http';
import { ManagerComponent } from './manager/manager.component';
import {MatListModule} from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { AlertaComponent } from './alerta/alerta.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AuthGuard } from './auth.guard';
import {MatInputModule} from '@angular/material/input';
const appRoutes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',  redirectTo: 'alerta', pathMatch: 'full'
  },
  { path: 'alerta',     component: AlertaComponent },
  { path: 'manager',     component: ManagerComponent, canActivate: [AuthGuard] },
  { path: 'login',     component: LoginComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    LoginComponent,
    AlertaComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [AlertService],
  bootstrap: [AppComponent],
  exports: [
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class AppModule { }
