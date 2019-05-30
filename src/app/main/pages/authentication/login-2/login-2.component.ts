import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Login2Service } from './login-2.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;
    token: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,

        private route: ActivatedRoute,
        private loginService: Login2Service,
        private router: Router,
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
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.route.params.subscribe(params => this.token = params.token);
    }

    login()
    {
        var user = this.loginForm.value;

        if(this.token){

            user.authToken = this.token;
            
            this.loginService.authenticate(user)
                .subscribe(

                    (response: any) => {

                        if(response && response.id)
                        {
                            let token = response.token;
                            localStorage.setItem('token', token);
                            this.router.navigate([ 'profile', response.id ]);
                        }
                        else if(response.status == 400)
                        {
                            this.snackBar.open('Login error, please try again. Error: ' + response.statusText , 'X', { duration: 10000, panelClass: 'pink' })
                    
                        }
                        else if(response.status == 401)
                        {
                            this.snackBar.open('Login error, please try again. Error: ' + response.statusText , 'X', { duration: 10000, panelClass: 'pink' })
                    
                        }
                        
                    },
                    error => this.snackBar.open('Login error, please try again. Error: ' + error.statusText , 'X', { duration: 10000, panelClass: 'pink' })
                    
                );
        }
        else if(!this.token){
            this.loginService.login(user)
                .subscribe(

                    (response: any) => {
                        
                        if(response && response.id)
                        {
                            let token = response.token;
                            localStorage.setItem('token', token);
                            this.router.navigate([ 'profile', response.id ]);
                        }
                        else if(response.status == 400)
                        {
                            this.snackBar.open('Login error, please try again. Error: ' + response.statusText , 'X', { duration: 10000, panelClass: 'pink' })
                    
                        }
                        else if(response.status == 401)
                        {
                            this.snackBar.open('Login error, please try again. Error: ' + response.statusText , 'X', { duration: 10000, panelClass: 'pink' })
                    
                        }
                        
                    },
                    error => this.snackBar.open('Login error, please try again. Error: ' + error.statusText , 'X', { duration: 10000, panelClass: 'pink' })
                    
                );

        }
    }

}
