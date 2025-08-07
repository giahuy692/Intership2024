// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule} from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { LabelModule, FloatingLabelModule } from '@progress/kendo-angular-label';
// import { ButtonsModule } from '@progress/kendo-angular-buttons';
// import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
// import { LayoutModule } from '@progress/kendo-angular-layout';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { IconsModule, SVGIconModule } from '@progress/kendo-angular-icons';
// import 'hammerjs';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { NotificationService } from '@progress/kendo-angular-notification';

// @NgModule({
//   declarations: [
//     AppComponent,
//   ],
//   imports: [
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     BrowserModule,
//     ButtonsModule,
//     CommonModule,
//     FloatingLabelModule,
//     FormsModule,
//     HttpClientModule,
//     IconsModule,
//     InputsModule,
//     LabelModule,
//     LayoutModule,
//     MatFormFieldModule,
//     MatInputModule,
//     ReactiveFormsModule,
//     TextBoxModule,
//     SVGIconModule
//   ],
//   providers: [
//     {
//       provide: LocationStrategy, 
//       useClass: HashLocationStrategy
//     },
//     NotificationService,
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InPurchaseModule } from './in-app/in-purchase/in-purchase.module';
import { InLayoutModule } from './in-app/in-layout/in-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-app/in-purchase/shared/services/purchase-data.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InPurchaseModule,
    InLayoutModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
