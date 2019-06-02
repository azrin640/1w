import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProfileEditService } from '../profile-edit.service';
import { User } from 'app/interface/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.scss']
})
export class ProfileEditFormComponent implements OnInit 
{
  form: FormGroup;
  user: User;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private profileEditService: ProfileEditService,
    private snackBar: MatSnackBar
  ) { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void 
  {
    
    this.profileEditService.getUserProfile()
      .subscribe(
        (response: User) => {

          if(response && response._id){

            this.form = this._formBuilder.group({
              _id       : [response._id || ''],
              company   : [response.company || ''],
              username  : [response.username || '', Validators.required],
              birthday  : [response.birthday || '', Validators.required],
              handphone : [response.handphone || '', Validators.required],
              address   : [response.address || '', Validators.required],
              address2  : [response.address2 || '', Validators.required],
              city      : [response.city || '', Validators.required],
              state     : [response.state || '', Validators.required],
              postcode  : [response.postcode || '', [Validators.required, Validators.maxLength(5)]],
              country   : [response.country || '', Validators.required]
            });

            this.user = response;

          }
          else{

            // Reactive Form
            this.form = this._formBuilder.group({
              company   : [''],
              name      : ['', Validators.required],
              birthday  : ['', Validators.required],
              handphone : ['', Validators.required],
              address   : ['', Validators.required],
              address2  : ['', Validators.required],
              city      : ['', Validators.required],
              state     : ['', Validators.required],
              postcode  : ['', [Validators.required, Validators.maxLength(5)]],
              country   : ['', Validators.required]
            });

          }
        }
      ); 

  }

  updateProfile()
  {
    this.profileEditService.editUserProfile(this.form.value)
      .subscribe(

        (response: User) => {
          if(response && response._id) {
            this.user = response;
            this.snackBar.open('Profile update success.', 'X', {duration: 10000, panelClass: 'light-green'});  
          }
          else this.snackBar.open('Error updating profile, please try again.', 'X', {duration: 10000, panelClass: 'pink'});       

        },
        error => this.snackBar.open('Error updating profile, please try again. Error: ' + error.statusText, 'X', {duration: 10000, panelClass: 'pink'})       
      )
      
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

}
