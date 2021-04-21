import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPatient } from 'src/app/core/models/patient';
import { PatientFormData } from 'src/app/core/models/patient-form-data';
import { ExcelService } from 'src/app/core/services/http/excel.service';
import { PatientService } from 'src/app/core/services/http/patient.service';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {
  patients$: Observable<IPatient[]>;
  patients: IPatient[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthYear', 'department', 'chamber', 'sexe', 'doctorId', 'delete', 'update'];
  sortedData: IPatient[];


  constructor(private _patientService: PatientService, private _excelService: ExcelService, public dialog: MatDialog, private _router: Router) { 
  }

  ngOnInit(): void {
    this.patients$ = this._patientService.getPatients();
  }


  delete(id) {
    this._patientService.deletePatient(id).subscribe(toto => {

      this.patients$ = this._patientService.getPatients();
    });

  }

  loadData() {
    this.patients$ = this._patientService.getPatients();
  }

  goToDetails(id) {
    this._router.navigateByUrl("patients/" + id);

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

  exportAsXLSX(): void {
    this._patientService.getPatients().subscribe(
      patients => this.patients = patients
    );
    this._excelService.exportAsExcelFile(this.patients, 'liste_patients');
  }

  sortData(sort: Sort) {
    let data;
    this.patients$.subscribe(patients => data = patients.slice)
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'firstName': return this.compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return this.compare(a.lastName, b.lastName, isAsc);
        case 'birthYear': return this.compare(a.birthYear, b.birthYear, isAsc);
        case 'department': return this.compare(a.department, b.department, isAsc);
        case 'chamber': return this.compare(a.chamber, b.chamber, isAsc);
        case 'sexe': return this.compare(a.sexe, b.sexe, isAsc);
        case 'doctorId': return this.compare(a.doctorId, b.doctorId, isAsc);
      
        default: return 0;
      }
    });
  }
   compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
}








