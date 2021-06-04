import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub : Subscription;

  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

  constructor( private authService: AuthService,
               private router: Router,
               private componentFactoryResolver: ComponentFactoryResolver) { }




  switchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }



  onSubmit( form: NgForm) {
        if(!form.valid) {
          return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoginMode){
          authObs = this.authService.login(email, password);
        }else {
          authObs = this.authService.signup(email, password);

        };

        authObs.subscribe(respData =>{
          console.log(respData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
      }, errorMesage => {
          console.log(errorMesage);
          this.showErrorAlert(errorMesage)
          this.error = errorMesage;
          this.isLoading = false;
      }
    );


        form.reset();
  }

  onCloseModal(){
    this.error = null;
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(error: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

     const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

     componentRef.instance.message = error;
     this.closeSub = componentRef.instance.close.subscribe(()=>{
          this.closeSub.unsubscribe();
          hostViewContainerRef.clear();
     })
  }
}
