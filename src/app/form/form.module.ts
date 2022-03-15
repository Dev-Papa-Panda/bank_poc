import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPageRoutingModule } from './form-routing.module';

import { FormPage } from './form.page';
import { AngularIbanModule } from 'projects/angular-iban/src/lib/angular-iban.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPageRoutingModule,
    ReactiveFormsModule,
    AngularIbanModule
  ],
  declarations: [FormPage]
})
export class FormPageModule {}
