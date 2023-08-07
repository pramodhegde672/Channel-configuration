import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './configApp/home/home.component';
import { Step2Component } from './pages/step2/step2.component';
import { Step3Component } from './pages/step3/step3.component';
import { Screen2Component } from './configApp/screen2/screen2.component';
import { Screen1Component } from './configApp/screen1/screen1.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent,
  // },
  {
    path: 'channels',
    component: Screen2Component,
  },
  {
    path: 'home',
    component: Screen1Component,
  },
  {
    path: 'step3',
    component: Step3Component,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
