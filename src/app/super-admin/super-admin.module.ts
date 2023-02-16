import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { ClinicsComponent } from './components/clinics/clinics.component';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeSuperAdminComponent } from './components/home-super-admin/home-super-admin.component';
import { HomeSuperComponent } from './components/home-super/home-super.component';
import { SearchClinicComponent } from './components/search-clinic/search-clinic.component';
import { AsideDirective } from './directives/aside.directive';

@NgModule({
  declarations: [
    UsersComponent,
    ClinicsComponent,
    HeaderComponent,
    HomeSuperAdminComponent,
    HomeSuperComponent,
    SearchClinicComponent,
    AsideDirective,
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModulesModule,
    ReactiveFormsModule,
  ],
})
export class SuperAdminModule {}
