import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  secretQuestion= "pet";
  answer='';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  submitted= false;
  

  //Agregamos otro enfoque de como obtener el Form, a través del viewChild
  @ViewChild('f') signUpform: NgForm;
  title = 'forms-td';

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signUpform.form.patchValue({
        userData:{
          username: suggestedName
        }
    });

  }

  
  /*
  
  onSubmit( form: NgForm){
    console.log(form);
  }
    */
  /*
  En este onSubmit estamos imprimiendo el formulario obtenido a partir del viewChild*/

   onSubmit() {
     this.submitted = true;
     this.user.username = this.signUpform.value.userData.username;
     this.user.email = this.signUpform.value.userData.email;
     this.user.secretQuestion = this.signUpform.value.secret;
     this.user.answer = this.signUpform.value.questionAnswer;
     this.user.gender = this.signUpform.value.gender;
     this.signUpform.reset();
     

   }
  
  
}

 