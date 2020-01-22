import { Component, OnInit } from '@angular/core';

import { MenuController, IonSlides } from '@ionic/angular';

import { NgForm } from "@angular/forms";

import { LoginService } from '../../services/login/login.service';
import { CommonService } from "../../services/common/common.service";

import { NativeStorage } from '@ionic-native/native-storage/ngx';
// import { FingerprintAIO  } from '@ionic-native/fingerprint-aio/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage {
  username: string;
  password: string;
  rememberMe: boolean = false;
  ambient: string = '';
  welcome: string;
  currentPlatform: string = '';

  constructor(
    private commonService: CommonService,
    private loginService: LoginService,
    private nativeStorage: NativeStorage,
    private sideMenu: MenuController,
    // private faio: FingerprintAIO
    private androidFingerprintAuth: AndroidFingerprintAuth
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
    this.commonService.presentLoading('Sto caricando…');

    // CALL AUTHENTICATION SERVICE
    this.loginService.login(form);
  }

  showFingerprintAuthDlg(){
    console.log('entrato in showFingerprintAuthDlg');

      this.androidFingerprintAuth.isAvailable()
          .then((result)=> {
              if(result.isAvailable){
                  // it is available

                  this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
                      .then(result => {
                          if (result.withFingerprint) {
                              console.log('Successfully encrypted credentials.');
                              console.log('Encrypted credentials: ' + result.token);
                          } else if (result.withBackup) {
                              console.log('Successfully authenticated with backup password!');
                          } else console.log('Didn\'t authenticate!');
                      })
                      .catch(error => {
                          if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                              console.log('Fingerprint authentication cancelled');
                          } else console.error(error)
                      });

              } else {
                  // fingerprint auth isn't available
              }
          })
          .catch(error => console.error(error));
  }
}
