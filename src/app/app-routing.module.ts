import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
