import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DoctorService } from './services/http/doctor.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from './services/http/patient.service';
import { ExcelService } from './services/http/excel.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [DoctorService, PatientService, ExcelService],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
