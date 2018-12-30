import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage, DetailPopover } from '../pages/home/home';
import { FiltersModal } from '../pages/filters/filters-modal';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignUpPage } from "../pages/signup/signup";
import { SignInPage } from "../pages/signin/signin";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    DetailPopover,
    FiltersModal,
    SignUpPage,
    SignInPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    SignUpPage,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    DetailPopover,
    FiltersModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
