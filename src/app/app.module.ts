import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { Step2Component } from './pages/step2/step2.component';
import { Step3Component } from './pages/step3/step3.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Screen2Component } from './configApp/screen2/screen2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {Component, Inject} from '@angular/core';
import {MatDialog,  MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DialogComponent } from './configApp/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { Screen1Component } from './configApp/screen1/screen1.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Step2Component,
    Step3Component,
    Screen2Component,
    DialogComponent,
    Screen1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
