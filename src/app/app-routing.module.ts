import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth-guard/auth.guard';
import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';

import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './core/components/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProfileComponent } from './user/pages/profile/profile.component';

const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verification', component: VerifyEmailComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthGuard],
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '',
    component: HomeComponent,
    //canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
