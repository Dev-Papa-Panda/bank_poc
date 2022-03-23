import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormPage } from '../form/form.page';

import {ValidatorService} from 'projects/angular-iban/src/public-api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public ibanGermany = 'DE12500105170648489890'
  details: any;
  search_text: any;
  details_container: any;
  show_search = false;

  dummy_storage = [
    {
      account_holder: "rr",
      amount: 1234,
      date: "2022-03-17",
      ibanReactive: "DE12500105170648489890",
      note: "ss",
    }
  ];

  constructor(
    public modalController: ModalController
  ) {
    console.log(JSON.parse( localStorage.getItem('transactions')));
    this.details=JSON.parse( localStorage.getItem('transactions'));
    if (localStorage.getItem('transactions') == undefined || localStorage.getItem('transactions') == null) {
      localStorage.setItem('transactions', JSON.stringify(this.dummy_storage));
    }
    this.details_container=JSON.parse( localStorage.getItem('transactions'));
  }

  sort_by_amount() {
    function compare( a, b ) {
      if ( a.amount < b.amount ){
        return -1;
      }
      if ( a.amount > b.amount ){
        return 1;
      }
      return 0;
    }
    
    this.details.sort( compare );
  }

  sort_by_date() {
    function compare( a, b ) {
      if ( a.date < b.date ){
        return -1;
      }
      if ( a.date > b.date ){
        return 1;
      }
      return 0;
    }
    
    this.details.sort( compare );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FormPage,
      cssClass: 'my-custom-class',
      componentProps: {
        if_edit: false
      }
    });

    modal.onDidDismiss().then(response => {
      console.log(JSON.parse( localStorage.getItem('transactions')));
      this.details=JSON.parse( localStorage.getItem('transactions'));
    })
    return await modal.present();
  }

  async edit_detail(index, item) {
    const modal = await this.modalController.create({
      component: FormPage,
      cssClass: 'my-custom-class',
      componentProps: {
        if_edit: true,
        edit_id: index,
        edit_item: item,
      }
    });
    return await modal.present();
  }

  set_val_for_search(val) {
    this.search_text = val;
    console.log(this.search_text);
  }

  cancel_search() {
    this.details = this.details_container;
  }

  search_account_holder() {
    let container = this.details_container;
    const that = this;
    this.details = container.filter(function(el) {
      // @ts-ignore
        return el.account_holder.toLowerCase().indexOf(that.search_text.toLowerCase()) !== -1
      });
  }

  search_note() {
    let container = this.details_container;
    const that = this;
    this.details = container.filter(function(el) {
      // @ts-ignore
        return el.note.toLowerCase().indexOf(that.search_text.toLowerCase()) !== -1
      });
  }

  show_hide_search() {
    if (this.show_search) {
      this.show_search = false;
    }
    else {
      this.show_search = true;
    }
  }

}
