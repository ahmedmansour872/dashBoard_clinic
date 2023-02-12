import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { ClinicsComponent } from './components/clinics/clinics.component';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';

@NgModule({
  declarations: [UsersComponent, ClinicsComponent],
  imports: [CommonModule, SuperAdminRoutingModule, SharedModulesModule],
})
export class SuperAdminModule {}
