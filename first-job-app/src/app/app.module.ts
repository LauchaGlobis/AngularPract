import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DangerCompComponent } from './danger-comp/danger-comp.component';
import { SuccessCompComponent } from './success-comp/success-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    DangerCompComponent,
    SuccessCompComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
