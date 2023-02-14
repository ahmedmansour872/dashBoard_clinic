import { AboutClinicsModule } from './about-clinics/about-clinics.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guards/authSuperAdmin/authguard.guard';
import { AuthAdminGuard } from './guards/authAdmin/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'Patient',
    loadChildren: () =>
      import('./patient/patient.module').then((mod) => mod.PatientModule),
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'superAdmin',
    loadChildren: () =>
      import('./super-admin/super-admin.module').then(
        (mod) => mod.SuperAdminModule
      ),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Clinics',
    loadChildren: () =>
      import('./about-clinics/about-clinics.module').then(
        (mod) => mod.AboutClinicsModule
      ),
    canActivate: [AuthAdminGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
