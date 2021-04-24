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
import { DoctorFormData } from 'src/app/core/models/doctor-form-data';
import { DoctorService } from 'src/app/core/services/http/doctor.service';
import { Department } from 'src/app/core/enums/department.enum';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent implements OnInit {
  doctorForm: FormGroup;
  formAction: string;
  doctors$: Observable<IDoctor[]>;
  doctor: IDoctor;
  enumKeys = [];

  constructor(
    private fb: FormBuilder,
    private _doctorService: DoctorService,
    private _route: Router,
    private _dialogRef: MatDialogRef<DoctorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DoctorFormData
  ) {
    this.formAction = data.toUpdate ? 'Modifier' : 'Ajouter';
    this.enumKeys = Object.values(Department);

    if (data.toUpdate) {
      this.doctorForm = this.fb.group({
        firstName: [
          data.doctor.firstName,
          [Validators.required, this.noWhitespaceValidator],
        ],
        lastName: [
          data.doctor.lastName,
          [Validators.required, this.noWhitespaceValidator],
        ],
        department: [Department[data.doctor.department], [Validators.required]],
      });
    } else {
      this.doctorForm = this.fb.group({
        firstName: ['', [Validators.required, this.noWhitespaceValidator]],
        lastName: ['', [Validators.required, this.noWhitespaceValidator]],
        department: ['', [Validators.required]],
      });
    }
  }
  ngOnInit(): void {}

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    /* const isWhitespace = false; */

    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onSubmit(doctor: IDoctor) {
    if (this.doctorForm.valid) {
      if (this.data.toUpdate) {
        doctor.id = this.data.doctor.id;
        this._doctorService
          .updateDoctor(doctor, doctor.id)
          .subscribe((next) => {
            this.doctorForm.reset();
            this._dialogRef.close();
          });
      } else {
        this._doctorService.postDoctor(doctor).subscribe((next) => {
          this.doctorForm.reset();
          this._dialogRef.close();
        });
      }
    }
  }
}
