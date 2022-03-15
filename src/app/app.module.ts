import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularIbanModule } from 'projects/angular-iban/src/lib/angular-iban.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularIbanModule,FormsModule,ReactiveFormsModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
