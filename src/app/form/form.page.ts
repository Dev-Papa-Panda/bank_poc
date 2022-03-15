import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

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
  edit_id: any;
  if_edit = false;
  edit_item: any;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
  ) {
    let if_edit = this.navParams.get('if_edit');
    console.log(if_edit);
    if (if_edit) {
    console.log(if_edit, "in if");
      this.edit_id = this.navParams.get('edit_id');
      this.edit_id = parseInt(this.edit_id);
      this.edit_item = this.navParams.get('edit_item');
      this.if_edit = true;
    }

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

    if (this.if_edit) {
      this.form.setValue({
        account_holder: this.edit_item.account_holder,
        ibanReactive: this.edit_item.ibanReactive,
        date: this.edit_item.date,
        amount: this.edit_item.amount,
        note: this.edit_item.note,
      })
    }
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
    
    // console.log(this.check_form_validation());
    if (!this.if_edit) {
      
      if (this.check_form_validation()) {
        
        
        let transcation=JSON.parse( localStorage.getItem('transactions'));
        if(transcation==null){
          transcation=[];
        }
        transcation.push(formValue);
        localStorage.setItem('transactions', JSON.stringify(transcation));
      }
  }

  if (this.if_edit) {
    let transcation=JSON.parse( localStorage.getItem('transactions'));
    if(transcation==null){
      transcation=[];
    }
    // transcation.push(formValue);
    transcation[this.edit_id]=formValue;
    localStorage.setItem('transactions', JSON.stringify(transcation));
  }
  }

  // set_to_storage(storage_key: any,data: any){
  //   localStorage.setItem(storage_key, JSON.stringify(data));
  //   //this.storage.set(storage_key, data);
  // }

  // async get_from_storage(storage_key:any){
  //   return JSON.parse( localStorage.getItem(storage_key));
  //   //return await this.storage.get(storage_key).then(val=>val)
    
  // }

  check_form_validation() {
    let date = this.form.value.date;
    if (date === '' || date == undefined || date == null) {
      console.log('Please select a date')
      return false;
    }
    date = date.toString();
    date = date.split('T')[0]
    // console.log(date);
    this.form.value.date = date;


    let amount = this.form.value.amount;
    amount = amount.toString();
    console.log(amount);
    amount = amount.replace(/\,/g, '');
    console.log(amount);
    if (amount.includes('.')) {
      
      let decimalPlaces = amount.split('.')[1];
      decimalPlaces = decimalPlaces.toString();
      console.log(decimalPlaces);
      if (decimalPlaces.length > 2) {
        console.log("Please give upto 2 decimal place amount");
        return false;
      }
    }

    if (!this.alphanumeric(amount)) {
      console.log("Please dont give any alphabet in amount");
      return false;
    }
    if (amount.length < 2) {
      console.log("Sorry, minimum length of amount must be 2 digits");
      return false;
    }
    amount = parseInt(amount);
    if (amount < 50) {
      console.log("Sorry, minimum amount limit is 50");
      return false;
    }
    if (amount > 20000000) {
      console.log("Sorry, maximum amount limit is 20000000");
      return false;
    }
    this.form.value.amount = amount;

    return true;
  }

  alphanumeric(inputtxt)
{
 var letterNumber = /^[0-9]+$/;
 if(inputtxt.match(letterNumber)) 
  {
   return true;
  }
else
  { 
  //  alert("message"); 
   return false; 
  }
  }
}

