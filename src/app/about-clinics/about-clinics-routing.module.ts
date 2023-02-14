import { ReceptionComponent } from './components/reception/reception.component';
import { StoreComponent } from './components/store/store.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HomeAdminCLinicComponent } from './components/home-admin-c-linic/home-admin-c-linic.component';
import { HomeCLinicsComponent } from './components/home-clinics/home-clinics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminCLinicComponent,
    children: [
      { path: '', component: HomeCLinicsComponent },
      { path: 'Doctor', component: DoctorComponent },
      { path: 'Store', component: StoreComponent },
      { path: 'Reception', component: ReceptionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutClinicsRoutingModule {}
