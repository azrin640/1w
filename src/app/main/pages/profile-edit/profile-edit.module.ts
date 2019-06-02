import { NgModule } from '@angular/core';
import { ProfileEditComponent } from './profile-edit.component';
import { ProfileEditService } from './profile-edit.service';
import { RouterModule } from '@angular/router';
import { ProfileEditFormComponent } from './profile-edit-form/profile-edit-form.component';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatStepperModule, MatDatepickerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  { 
      path: 'profile/edit/form',
      component: ProfileEditComponent
  }
];

@NgModule({
  declarations: [
    ProfileEditComponent,
    ProfileEditFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,

    FuseSharedModule
  ],
  providers: [
    ProfileEditService
  ]
})
export class ProfileEditModule { }
