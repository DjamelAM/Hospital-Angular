import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientComponent } from './patient.component';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { SharedModule } from '../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';



@NgModule({
  declarations: [PatientComponent, PatientFormComponent, PatientsListComponent, PatientDetailComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
