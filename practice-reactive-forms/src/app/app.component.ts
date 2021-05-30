import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  reactiveForm : FormGroup;
  forbidName = 'Test';
  

  ngOnInit(){

      this.reactiveForm = new FormGroup({

        'formData' : new FormGroup ({
          'projectName': new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
          'mail': new FormControl(null, [Validators.required, Validators.email],
                                         this.forbiddenEmail
            ),
        }),
          'status' : new FormControl('critical')
      });
  }


  onSubmit() {
    console.log(
    `the information of the Form :
        ProjectName: ${this.reactiveForm.value.formData.projectName},
        Mail: ${this.reactiveForm.value.formData.mail},
        Status: ${this.reactiveForm.value.status}
    `
      
      );

  }

  forbiddenName(control: FormControl) : {[s:string]: boolean} {
    if( this.forbidName === control.value) {
        return {'NameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject)=>{
          setTimeout(() => {
            if(control.value === 'test@test.com'){
              resolve ({'emailIsForb' : true});
            }else {
              resolve(null);
            }
          }, 1000);
    });
    return promise
  }
}
