import { HomeSuperComponent } from './components/home-super/home-super.component';
import { SearchClinicComponent } from './../patient/components/search-clinic/search-clinic.component';
import { ClinicsComponent } from './components/clinics/clinics.component';
import { HomeSuperAdminComponent } from './components/home-super-admin/home-super-admin.component';
import { UsersComponent } from './components/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeSuperAdminComponent,
    children: [
      { path: '', component: HomeSuperComponent },
      { path: 'users', component: UsersComponent },
      { path: 'clinics', component: ClinicsComponent },
      { path: 'clinic/:id', component: SearchClinicComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
