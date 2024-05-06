import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LabelModule, FloatingLabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { IconsModule, SVGIconModule } from '@progress/kendo-angular-icons';
import 'hammerjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '@progress/kendo-angular-notification';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonsModule,
    CommonModule,
    FloatingLabelModule,
    FormsModule,
    HttpClientModule,
    IconsModule,
    InputsModule,
    LabelModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TextBoxModule,
    SVGIconModule
  ],
  providers: [
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
