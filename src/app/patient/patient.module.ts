import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SearchClinicComponent } from './components/search-clinic/search-clinic.component';


@NgModule({
  declarations: [
    SearchClinicComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
