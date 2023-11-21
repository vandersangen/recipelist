import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm, NgModel} from "@angular/forms";
import {AuthService} from "./auth.service";
import {AuthResponse} from "./auth.interface";
import {Router} from "@angular/router";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error?: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    let formValue = form.value;
    let email = formValue.email;
    let password = formValue.password;

    if (form.valid === false) {
      return;
    }


    if (this.isLoginMode) {
      this.login(email, password);
    } else {
      this.signup(email, password);
    }

    form.reset();
  }

  private login(email: string, password: string) {
    this.isLoading = true;
    this.authService.login(email, password)
      .subscribe((response: AuthResponse) => {
          delete this.error;
          this.isLoading = false;

          this.router.navigate(['/recipe-book']);
        },
        error => {
          this.error = error;
          this.isLoading = false;
        }
      );
  }

  private signup(email: string, password: string) {
    this.isLoading = true;
    this.authService.signup(email, password)
      .subscribe(
        (response: AuthResponse) => {
          delete this.error;
          this.isLoading = false;

          this.router.navigate(['/recipes']);

        }, error => {
          this.error = error;
          this.isLoading = false;

        }
      );
  }
}
