import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {AppService} from '@services/app.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { RegistrationService } from '../../services/registration-service.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box';

    public registerForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
        confirmpassword :string="";

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private register: RegistrationService,
        private  route: Router 
    ) {}

    user = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        active: 1,
        password: '',
        lastLogin: '22/09/2023',
        role:  ''

      };

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, [Validators.required]),
            retypePassword: new UntypedFormControl(null, [Validators.required])
        });
    }

    async registerByAuth() {
        if (this.registerForm.valid) {
            this.isAuthLoading = true;
            await this.appService.registerByAuth(this.registerForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    async registerByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.registerByGoogle();
        this.isGoogleLoading = false;
    }

    async registerByFacebook() {
        this.isFacebookLoading = true;
        await this.appService.registerByFacebook();
        this.isFacebookLoading = false;
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }

    onSubmit() {
        const formData = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            emailAddress: this.user.emailAddress,
            active: this.user.active,
            password: this.user.password,
            lastLogin: this.user.lastLogin,
            role: this.user.role,
        };
      
        this.register.registerUser(formData).subscribe({
          next: (response) => {
            console.log('User registered successfully', response);
            alert('User registered successfully');
            this.route.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error registering user', error);
          }
        });
      }
}
