import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ForgotPassword2Service } from './forgot-password-2.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector     : 'forgot-password-2',
    templateUrl  : './forgot-password-2.component.html',
    styleUrls    : ['./forgot-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotPassword2Component implements OnInit
{
    forgotPasswordForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private forgotPasswordService: ForgotPassword2Service,
        public snackBar: MatSnackBar
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    recoverPassword()
    {
        this.forgotPasswordService.recoverPassword(this.forgotPasswordForm.value)
            .subscribe(

                (response: any) => {                    
                    if(response.status == 200) this.snackBar.open(response.statusText, 'X', { duration: 10000, panelClass: 'light-green' });
                    else if(response.status == 400) this.snackBar.open('Request error, please try again. Error: ' + response.statusText , 'X', { duration: 10000, panelClass: 'pink' });
                },
                error => this.snackBar.open('Request error, please try again. Error: ' + error.statusText , 'X', { duration: 10000, panelClass: 'pink' })
            
            )
    }
}
