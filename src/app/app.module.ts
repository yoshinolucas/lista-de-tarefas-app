import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './tasks/components/shared/navbar/navbar.component';
import { TaskListComponent } from './tasks/components/task-list/task-list/task-list.component';
import { TaskRegisterComponent } from './tasks/components/task-register/task-register/task-register.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskRegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
