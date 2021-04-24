import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDoctor } from 'src/app/core/models/doctor';
import { IPatient } from 'src/app/core/models/patient';
import { PatientFormData } from 'src/app/core/models/patient-form-data';
import { DoctorService } from 'src/app/core/services/http/doctor.service';
import { PatientService } from 'src/app/core/services/http/patient.service';
import { PatientsListComponent } from '../../pages/patients-list/patients-list.component';
import { Department } from 'src/app/core/enums/department.enum';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup;
  formAction: string;
  patients$: Observable<IPatient[]>;
  patient: IPatient;
  enumKeys = [];

  departments: string[] = [
    'Neurologie',
    'Pediatrie',
    'Radiologie',
    'Cardiologie',
  ];

  sexes: string[] = ['Male', 'Female'];

  doctors: IDoctor[];

  constructor(
    private fb: FormBuilder,
    private _patientService: PatientService,
    private _doctorService: DoctorService,
    private _route: Router,
    private _dialogRef: MatDialogRef<PatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientFormData
  ) {
    this.formAction = data.toUpdate ? 'Modifier' : 'Ajouter';
    this.enumKeys = Object.values(Department);
    if (data.toUpdate) {
      this.patientForm = this.fb.group({
        firstName: [
          data.patient.firstName,
          [Validators.required, this.noWhitespaceValidator],
        ],
        lastName: [
          data.patient.lastName,
          [Validators.required, this.noWhitespaceValidator],
        ],
        birthYear: [
          data.patient.birthYear,
          [Validators.required, Validators.minLength(2000)],
        ],
        department: [
          Department[data.patient.department],
          [Validators.required],
        ],
        chamber: [data.patient.chamber, [Validators.required]],
        sexe: [data.patient.sexe, [Validators.required]],
        doctorId: [data.patient.doctorId, [Validators.required]],
      });
    } else {
      this.patientForm = this.fb.group({
        firstName: ['', [Validators.required, this.noWhitespaceValidator]],
        lastName: ['', [Validators.required, this.noWhitespaceValidator]],
        birthYear: ['', [Validators.required, Validators.minLength(1900)]],
        department: ['', [Validators.required]],
        chamber: ['', [Validators.required]],
        sexe: ['', [Validators.required]],
        doctorId: ['', [Validators.required]],
      });
    }
  }
  ngOnInit(): void {
    this._doctorService
      .getDoctors()
      .subscribe((doctors) => (this.doctors = doctors));
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    /* const isWhitespace = false; */

    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onSubmit(patient: IPatient) {
    if (this.patientForm.valid) {
      if (this.data.toUpdate) {
        patient.id = this.data.patient.id;
        this._patientService
          .updatePatient(patient, patient.id)
          .subscribe((next) => {
            this.patientForm.reset();
            this._dialogRef.close();
          });
      } else {
        this._patientService.postPatient(patient).subscribe((next) => {
          this.patientForm.reset();
          this._dialogRef.close();
        });
      }
    }
  }
}
