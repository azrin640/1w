import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResetPassword2Service } from './reset-password-2.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector     : 'reset-password-2',
    templateUrl  : './reset-password-2.component.html',
    styleUrls    : ['./reset-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ResetPassword2Component implements OnInit, OnDestroy
{
    resetPasswordForm: FormGroup;
    token: Params;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,

        private route: ActivatedRoute,
        private resetPasswordService: ResetPassword2Service,
        public snackBar: MatSnackBar,
        private router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

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
        this.resetPasswordForm = this._formBuilder.group({
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });
        
        this.route.params.subscribe(auth => this.token = auth.token);
        
    }

    resetPassword()
    {
        let user = this.resetPasswordForm.value;
        user.token = this.token;

        this.resetPasswordService.resetPassword(user)
            .subscribe(
                (response: any) => {
                    
                    console.log(response);
                    if(response.status == 401) {
                        this.snackBar.open(response.statusText, 'X', {duration: 10000, panelClass: 'pink'});
                        this.router.navigate(['auth/forgot-password-2'])
                    }
                    else if(response.status == 400) {
                        this.snackBar.open(response.statusText, 'X', {duration: 10000, panelClass: 'pink'});
                        this.router.navigate(['auth/forgot-password-2'])
                    }
                    else if(response.status == 200) {
                        this.snackBar.open(response.statusText, 'X', {duration: 10000, panelClass: 'light-green'});
                        localStorage.setItem('token', response.jwtToken);
                        this.router.navigate(['profile', response.id]);
                    }
                },
                error => this.snackBar.open(error.statusText, 'X', {duration: 10000, panelClass: 'pink'})
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

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
