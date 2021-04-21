import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDoctor } from 'src/app/core/models/doctor';
import { IPatient } from 'src/app/core/models/patient';
import { PatientFormData } from 'src/app/core/models/patient-form-data';
import { DoctorService } from 'src/app/core/services/http/doctor.service';
import { PatientService } from 'src/app/core/services/http/patient.service';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  patientId: number;
  patient: IPatient;
  doctor: IDoctor;
  patient$: Observable<IPatient>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthYear', 'department', 'chamber', 'sexe', 'doctorId', 'delete', 'update'];

  constructor(private _activateRoute: ActivatedRoute,
    private _patientService: PatientService,
    private _doctorService: DoctorService,
    public dialog: MatDialog,
    private _router: Router) { }

  ngOnInit(): void {
    this.patientId = Number(this._activateRoute.snapshot.paramMap.get('id'));

    if (this.patientId) {
      this._patientService.getPatient(this.patientId).subscribe(patient => {
        this.patient = patient;
        this._doctorService.getDoctor(patient.doctorId).subscribe(doctor =>
          this.doctor = doctor);
      });
    }
  }

  goToDoctor(id) {
    this._router.navigateByUrl("doctors/" + id);
  }


  delete(id) {
    this._patientService.deletePatient(id).subscribe((next) => {

      this._router.navigateByUrl("patients");
    });

  }

  loadData() {
    this._router.navigateByUrl("patients");
  }


  openDialog(toUpdate: boolean, patient: IPatient) {

    const patientFormData: PatientFormData = {
      toUpdate: toUpdate,
      patient: patient
    };

    const dialogRef = this.dialog.open(PatientFormComponent, {
      data: patientFormData
    });

    dialogRef.afterClosed().subscribe(result => {

      this.loadData();
    });
  }


}
