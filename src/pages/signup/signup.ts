import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {SignInPage} from "../signin/signin";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignUpPage {
  createSuccess = false;
  registerCredentials = {name: '', email: '', password: '' };

  constructor(private nav: NavController, private alertCtrl: AlertController) { }



  public signup() {
    this.createSuccess = true;
    this.showPopup("Success", "Account created.");
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Terms and Conditions',
      message: '<p>Last updated: December 30, 2018</p>\n' +
      '\n' +
      '\n' +
      '<p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the dealspotter.com website (the "Service") operated by DealSpotter ("us", "we", or "our").</p>\n' +
      '\n' +
      '<p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>\n' +
      '\n' +
      '<p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. The Terms and Conditions agreement  for DealSpotter is based on the <a href="https://termsfeed.com/blog/sample-terms-and-conditions-template/">TermsFeed\'s Terms and Conditions Template</a>.</p>\n' +
      '\n' +
      '\n' +
      '<h2>Accounts</h2>\n' +
      '\n' +
      '<p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>\n' +
      '\n' +
      '<p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>\n' +
      '\n' +
      '<p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>\n' +
      '\n' +
      '\n' +
      '<h2>Links To Other Web Sites</h2>\n' +
      '\n' +
      '<p>Our Service may contain links to third-party web sites or services that are not owned or controlled by DealSpotter.</p>\n' +
      '\n' +
      '<p>DealSpotter has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that DealSpotter shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>\n' +
      '\n' +
      '<p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '<h2>Governing Law</h2>\n' +
      '\n' +
      '<p>These Terms shall be governed and construed in accordance with the laws of Sweden, without regard to its conflict of law provisions.</p>\n' +
      '\n' +
      '<p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>\n' +
      '\n' +
      '\n' +
      '<h2>Changes</h2>\n' +
      '\n' +
      '<p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>\n' +
      '\n' +
      '<p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>\n' +
      '\n' +
      '\n' +
      '<h2>Contact Us</h2>\n' +
      '\n' +
      '<p>If you have any questions about these Terms, please contact us.</p>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    alert.present();
  }

  public goToSignInPage() {
    this.nav.setRoot(SignInPage).then( ()=>{
      this.nav.popToRoot().then( ()=> {
      }).catch(err=>{
        //TError.handleException( "err 2: ", err );

      });
    }).catch(err=>{
    });
  }

}
