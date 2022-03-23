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

  constructor(
    public modalController: ModalController
  ) {
    console.log(JSON.parse( localStorage.getItem('transactions')));
    this.details=JSON.parse( localStorage.getItem('transactions'));
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

}
