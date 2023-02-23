import { SearchPatientsComponent } from './components/Receptionist/search-patients/search-patients.component';
import { AppointmentsComponent } from './components/Receptionist/appointments/appointments.component';
import { PatientsComponent } from './components/Receptionist/patients/patients.component';
import { InsuranceComponent } from './components/Receptionist/insurance/insurance.component';
import { ReciptionGuard } from './../guards/reciptopn/reciption.guard';
import { DoctorGuard } from './../guards/doctors/doctor.guard';
import { StoreGuard } from './../guards/store/store.guard';
import { ReceptionComponent } from './components/Receptionist/reception/reception.component';
import { StoreComponent } from './components/store/store.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorComponent as DoctorsComponent } from './components/Receptionist/doctor/doctor.component';
import { HomeAdminCLinicComponent } from './components/home-admin-clinic/home-admin-c-linic.component';
import { HomeCLinicsComponent } from './components/Admin/home-clinics/home-clinics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { UsersComponent } from './components/Admin/users/users.component';
import { AdminGuard } from '../guards/adminClinic/admin.guard';
import { PaymentsComponent } from './components/Receptionist/payments/payments.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminCLinicComponent,
    children: [
      {
        path: '',
        component: HomeCLinicsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'Admin',
        component: HomeCLinicsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'Admin/Users',
        component: UsersComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'Admin/Doctor',
        component: DoctorComponent,
        canActivate: [DoctorGuard],
      },
      {
        path: 'Admin/Store',
        component: StoreComponent,
        canActivate: [StoreGuard],
      },

      {
        path: 'Admin/Receptionist',
        component: ReceptionComponent,
        canActivate: [ReciptionGuard],
      },
      {
        path: 'Admin/Receptionist/Payments',
        component: PaymentsComponent,
        pathMatch: 'full',
        canActivate: [ReciptionGuard],
      },
      {
        path: 'Admin/Receptionist/Doctor',
        component: DoctorsComponent,
        canActivate: [ReciptionGuard],
      },
      {
        path: 'Admin/Receptionist/Insurance',
        component: InsuranceComponent,
        canActivate: [ReciptionGuard],
      },
      {
        path: 'Admin/Receptionist/Patients',
        component: PatientsComponent,
        canActivate: [ReciptionGuard],
      },

      {
        path: 'Admin/Receptionist/searchPatients/:id',
        component: SearchPatientsComponent,
        canActivate: [ReciptionGuard],
      },
      {
        path: 'Admin/Receptionist/Appointments',
        component: AppointmentsComponent,
        canActivate: [ReciptionGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutClinicsRoutingModule {}
