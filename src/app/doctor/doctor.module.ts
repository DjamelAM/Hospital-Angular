import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor.component';

import { DoctorsListComponent } from './pages/doctors-list/doctors-list.component';
import { SharedModule } from '../shared/shared.module';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';



@NgModule({
  declarations: [DoctorComponent, DoctorFormComponent, DoctorsListComponent, DoctorDetailComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
