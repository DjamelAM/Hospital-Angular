import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { PatientComponent } from './patient.component';



const routes: Routes = [{
  path: '',
  component: PatientComponent,
  children: [

    {
      path: '',
      component: PatientsListComponent
    },
    {
      path: 'patients-form',
      component: PatientFormComponent
    },
    {
      path: ':id',
      component: PatientDetailComponent
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
export class PatientRoutingModule { }
