import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {SignUpPage} from "../signup/signup";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SignInPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.nav.push(SignUpPage);
  }

  public signin() {
    this.showLoading()
    this.nav.setRoot(TabsPage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
