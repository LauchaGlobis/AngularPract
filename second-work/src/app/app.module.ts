import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
//Components
import { AppComponent } from './app.component';
import { DataBindComponent } from './data-bind/data-bind.component';

@NgModule({
  declarations: [
    AppComponent,
    DataBindComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
