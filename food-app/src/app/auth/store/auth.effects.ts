import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthResponseData } from '../auth.service';
import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(
    new Date().getTime() + expiresIn *1000
  );
 return new AuthActions.AuthenticateSuccess({
     email: email,
     userId: userId,
     token: token,
     expirationDate: expirationDate
   })
};

const handleError = (errorRes: any) =>{
  let errorMessage = 'An uknown error ocurred';
  if(!errorRes.error || !errorRes.error.error){
      return of( new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
    errorMessage = 'This email exists already';
    break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist';
    break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct';
    break;
   }
  return of(new AuthActions.AuthenticateFail(errorMessage));

};

@Injectable()

export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpAction: AuthActions.SignUpStart)=>{
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDn1zUYiCcv8ESr0bolwh-_XPETm0NNb-8',

      {
        email: signUpAction.payload.email,
        password: signUpAction.payload.password,
        returnSecureToken: true
      }
      )
      .pipe(
        map(resData =>{
          return handleAuthentication(
            +resData.expiresIn,
            resData.email,
            resData.localId,
            resData.idToken
          )

        }),
        catchError(errorRes =>{
             return handleError(errorRes);
         })
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart)=>{
      return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDn1zUYiCcv8ESr0bolwh-_XPETm0NNb-8'
      ,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      )
      .pipe(
        map(resData =>{
          return handleAuthentication(
            +resData.expiresIn,
            resData.email,
            resData.localId,
            resData.idToken
          )


        }),
        catchError(errorRes =>{
          return handleError(errorRes);
         })
      );
    }),

  );

  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(()=>{
      this.router.navigate(['/']);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router){}
}
