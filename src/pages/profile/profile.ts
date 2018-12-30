import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignInPage} from "../signin/signin";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  foodPrefs = '';

  constructor(public nav: NavController, public cf: ChangeDetectorRef) {
    this.foodPrefs='none';
  }

  logout(){
    this.nav.setRoot(SignInPage).then( ()=>{
      this.nav.popToRoot().then( ()=> {
      }).catch(err=>{
        //TError.handleException( "err 2: ", err );

      });
    }).catch(err=>{
    });
  }

  segmentChanged()
  {
    this.cf.detectChanges();
  }
}
