import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup , Validators } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  //Creamos un formulario reactivo
  signUpForm : FormGroup;
  forbiddenUserNames = ['Lautaro', 'Anna'];

  ngOnInit() {
     /*En los atributos del formulario, el segundo parámetro son los validators, se pasa Validator.metodo
     pero el método sin los paréntesis porque es una referencia al mismo, angular sabe que tiene que
     ejecutarlo */
    this.signUpForm = new FormGroup({
     
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          'email': new FormControl(null,
                                  [Validators.required, Validators.email],
                                  this.forbiddenEmails
                                  )
        }),
          'gender': new FormControl('male'),
          'hobbies': new FormArray([])
    });

    this.signUpForm.valueChanges.subscribe(
      (value) => console.log(value)
    );

    this.signUpForm.statusChanges.subscribe(
      (status) => console.log(status)
    )

    this.signUpForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signUpForm.patchValue({
      'userData': {
        'username': 'Anna',
        
      },
    });

  }

  onSubmit(){

       console.log(this.signUpForm);
       this.signUpForm.reset();
  }

  onAddhobby() {
     const control = new FormControl(null, Validators.required);
     (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl) : {[s:string]: boolean} {
        if(this.forbiddenUserNames.indexOf(control.value) !== -1){
          return {'NameIsForbidden': true};
        }
        return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject)=>{
               setTimeout(() => {
                      if( control.value === 'test@test.com'){
                        resolve({'emailIsForbidden': true});
                      }else {
                        resolve(null);
                      }
               }, 1500);
        });

        return promise;
  }
}

