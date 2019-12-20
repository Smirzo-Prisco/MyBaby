import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoginService } from '../../services/login/login.service';
// import { LoadingService } from "../../services/loading/loading.service";
// import { PlatformService } from "../../services/platform/platform.service";
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { MenuController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  username: string;
  password: string;
  rememberMe: boolean = false;
  ambient: string = '';
  welcome: string;
  currentPlatform: string = '';

  constructor(
    // private loadingService: LoadingService,
    // private platformService: PlatformService,
    private loginService: LoginService,
    private nativeStorage: NativeStorage,
    private sideMenu: MenuController
  ) { }

  // ngOnInit() {
  //
  // }

  // ionViewWillEnter() {
  //    nascondo il menu
  //   this.sideMenu.enable(false);
  //
  //   this.nativeStorage.getItem('welcome').then(value => {
  //     if(value == 'already welcome') {
  //       this.welcome = 'Bentornato';
  //
  //       this.nativeStorage.getItem('username').then(value => {
  //         this.username = value;
  //       });
  //
  //       this.nativeStorage.getItem('remember me').then(value => {
  //         this.rememberMe = value;
  //
  //         if(value) {
  //           this.nativeStorage.getItem('password').then(value => {
  //             this.password = value;
  //           });
  //         }
  //       });
  //
  //     } else {
  //       this.welcome = 'Benvenuto';
  //     }
  //   });
  // }

  // ON LOGIN SENDS ACCESS DATA TO AUTH SERVICE
  onLogin(form: NgForm) {

    // PRESENT LOADING MODAL
    // this.loadingService.presentLoading('Sto caricando il tuo Easyproject…');

    // CALL AUTHENTICATION SERVICE
    this.loginService.login(form);
  }
}
