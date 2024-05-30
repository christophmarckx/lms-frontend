import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../service/authentication/authentication.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  errorMessage: string | undefined;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){
    const {email, password} = this.loginForm.value;

    let subscribe = this.authenticationService.loginUser(email, password)
    if (subscribe === undefined) {
      this.errorMessage = 'Invalid username or password';
      console.error('Login error: subscribe undefined');
    }
    else {
      subscribe.subscribe({
        next: authenticationInformation => {

          localStorage.setItem('access_token', authenticationInformation.access_token);
          localStorage.setItem('refresh_token', authenticationInformation.refresh_token);

          this.authenticationService.getUserFromBackend(email)
            .subscribe({
              next: authenticatedUser => {
                this.authenticationService.setSession(authenticatedUser);

                this.router.navigate([`/`])
                  .catch(result => console.log(result));
              },
              error: err => {
                this.authenticationService.logoutUser();
                this.errorMessage = 'Invalid username or password';
                console.error('Login error from backend:', err);
              }})
        },
        error: err => {
          this.authenticationService.logoutUser();
          this.errorMessage = 'Invalid username or password';
          console.error('Login error from keycloak:', err);
        }
      });
    }
  }
}
