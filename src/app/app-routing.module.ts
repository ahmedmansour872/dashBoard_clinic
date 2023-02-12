import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guards/authguard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'clinic',
    loadChildren: () =>
      import('./patient/patient.module').then((mod) => mod.PatientModule),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'superAdmin',
    loadChildren: () =>
      import('./super-admin/super-admin.module').then(
        (mod) => mod.SuperAdminModule
      ),
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
