import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  signal,
  ViewChild
} from "@angular/core";
import {NgForm, NgModel} from "@angular/forms";
import {AuthService} from "./auth.service";
import {AuthResponse} from "./auth.interface";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error?: string;

  @ViewChild(PlaceholderDirective,  {static: false}) alertHost?: PlaceholderDirective = undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
          this.handleErrorComponent(error);
        }
      );
  }

  private handleErrorComponent(error: any) {
    this.error = error;
    this.isLoading = false;

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    if (this.alertHost === undefined) {
      return;
    }

    let ref = this.alertHost.viewContainerRef;
    ref.clear();
    let componentRef = ref.createComponent(componentFactory);
    componentRef.instance.message = error;
    this.subscription = componentRef.instance.close.subscribe(() => {
      this.subscription.unsubscribe();
      ref.clear();
    });
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
          this.handleErrorComponent(error);
        }
      );
  }

  onHandleError() {
    delete this.error;
  }
}
