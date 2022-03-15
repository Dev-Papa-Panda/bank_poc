import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import {ValidatorService} from 'projects/angular-iban/src/public-api';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  form: FormGroup;
  public ibanGermany = 'DE12500105170648489890';
  details:any={};
  ibanReactive: any;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {
    this.ibanReactive = new FormControl(
      null,
        [
          Validators.required,
          ValidatorService.validateIban
        ]
    );

    this.form = this.formBuilder.group({
      account_holder: ['', Validators.required],
      ibanReactive: this.ibanReactive,
      date:['', Validators.required],
      amount:['', Validators.required],
      note:['', Validators.required],
          
    });
    this.form.valueChanges.subscribe(console.log);
   }

  ngOnInit() {
   
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async submitHandler(){
    const that=this;
    
    const formValue = this.form.value;
    
    
    let transcation=JSON.parse( localStorage.getItem('transactions'));
    if(transcation==null){
      transcation=[];
    }
    transcation.push(formValue);
    localStorage.setItem('transactions', JSON.stringify(transcation));
  }

  // set_to_storage(storage_key: any,data: any){
  //   localStorage.setItem(storage_key, JSON.stringify(data));
  //   //this.storage.set(storage_key, data);
  // }

  // async get_from_storage(storage_key:any){
  //   return JSON.parse( localStorage.getItem(storage_key));
  //   //return await this.storage.get(storage_key).then(val=>val)
    
  // }


}

