import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do/to-do-list/to-do-list.component';
import { ToDoItemComponent } from './to-do/to-do-item/to-do-item.component';
import { AddToDoComponent } from './to-do/add-to-do/add-to-do.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header/header.component';
import { ToDoHistoryComponent } from './to-do/to-do-history/to-do-history.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoItemComponent,
    AddToDoComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    ToDoHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
