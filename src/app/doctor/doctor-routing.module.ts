import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

import { DoctorsListComponent } from './pages/doctors-list/doctors-list.component';
import { DoctorComponent } from './doctor.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';



const routes: Routes = [{
  path: '',
  component: DoctorComponent,
  children: [

    {
      path: '',
      component: DoctorsListComponent
    },
    {
      path: 'doctors-form',
      component: DoctorFormComponent
    },
    {
      path: ':id',
      component: DoctorDetailComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ]
},
{
  path: '**',
  component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
