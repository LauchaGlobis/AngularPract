import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'practice-template-forms';
  subscription= ['Advanced'];
  submitted= false;

  formData = {
    email: '',
    subscription: '',
    password: ''
  }

  onSubmit(form: NgForm) {
    this.formData.email = form.value.email;
    this.formData.subscription = form.value.subscription;
    this.formData.password = form.value.password;
    this.submitted = true;
    form.reset();
  }
}
