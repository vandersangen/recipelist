import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponse} from "./auth.interface";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<UserModel | null>(null);
  private logoutTimer?: number;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public autoLogin() {
    const user: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(
      localStorage.getItem('user') ?? ''
    );

    if (!user) {
      return;
    }

    const loadedUser = new UserModel(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.token !== '') {
      this.user.next(loadedUser);
      let expirationInMs = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationInMs)
    }
  }

  public autoLogout(expirationDuration: number) {
    this.logoutTimer = setTimeout(() => {
        this.logout();
      },
      expirationDuration
    );
  }

  public signup(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => this.handleError(errorResponse)),
      tap((response: AuthResponse) => this.handleAuth(response, email))
    )
  }

  public login(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => this.handleError(errorResponse)),
      tap((response: AuthResponse) => this.handleAuth(response, email))
    );
  }

  private handleError(errorResponse: any) {
    let errorMessage = 'An unknown error occured';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email is alread used by another user';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Operation is not allowed';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts.. Try again in a few minutes';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Wrong credentials';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User has been blocked!!';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuth(response: AuthResponse, email: string) {
    {
      let user = new UserModel(
        email,
        response.localId,
        response.idToken,
        new Date(new Date().getTime() + (+response.expiresIn * 1000))
      )
      this.user.next(user);
      this.autoLogout(+response.expiresIn * 1000)
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      delete this.logoutTimer;
    }
  }

}
