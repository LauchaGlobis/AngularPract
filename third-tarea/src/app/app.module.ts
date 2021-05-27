import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
//Components
import { AppComponent } from './app.component';
import { MainCompComponent } from './main-comp/main-comp.component';
import { IntMainCompComponent } from './int-main-comp/int-main-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    MainCompComponent,
    IntMainCompComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
