import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { HomeCLinicsComponent } from './components/Admin/home-clinics/home-clinics.component';

import { SharedModulesModule } from './../shared-modules/shared-modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutClinicsRoutingModule } from './about-clinics-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorComponent as DoctorsComponent } from './components/Receptionist/doctor/doctor.component';
import { StoreComponent } from './components/store/store.component';
import { ReceptionComponent } from './components/Receptionist/reception/reception.component';
import { HomeAdminCLinicComponent } from './components/home-admin-clinic/home-admin-c-linic.component';
import { DirecitvesModule } from '../directivesAndPipeModules/direcitves.module';
import { UsersComponent } from './components/Admin/users/users.component';
import { PaymentsComponent } from './components/Receptionist/payments/payments.component';
import { InsuranceComponent } from './components/Receptionist/insurance/insurance.component';
import { PatientsComponent } from './components/Receptionist/patients/patients.component';
import { AppointmentsComponent } from './components/Receptionist/appointments/appointments.component';
import { SearchPatientsComponent } from './components/Receptionist/search-patients/search-patients.component';

@NgModule({
  declarations: [
    HomeCLinicsComponent,
    HomeAdminCLinicComponent,
    DoctorComponent,
    DoctorsComponent,
    StoreComponent,
    ReceptionComponent,
    AsideBarComponent,
    UsersComponent,
    PaymentsComponent,
    InsuranceComponent,
    PatientsComponent,
    AppointmentsComponent,
    SearchPatientsComponent,
  ],
  imports: [
    CommonModule,
    AboutClinicsRoutingModule,
    SharedModulesModule,
    ReactiveFormsModule,
    DirecitvesModule,
  ],
})
export class AboutClinicsModule {}
