import { HomeCLinicsComponent } from './components/home-clinics/home-clinics.component';

import { SharedModulesModule } from './../shared-modules/shared-modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutClinicsRoutingModule } from './about-clinics-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeAdminCLinicComponent } from './components/home-admin-c-linic/home-admin-c-linic.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { StoreComponent } from './components/store/store.component';
import { ReceptionComponent } from './components/reception/reception.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';

@NgModule({
  declarations: [
    HomeCLinicsComponent,
    HomeAdminCLinicComponent,
    DoctorComponent,
    StoreComponent,
    ReceptionComponent,
    HeaderComponent,
    FooterComponent,
    AsideBarComponent,
  ],
  imports: [
    CommonModule,
    AboutClinicsRoutingModule,
    SharedModulesModule,
    ReactiveFormsModule,
  ],
})
export class AboutClinicsModule {}
