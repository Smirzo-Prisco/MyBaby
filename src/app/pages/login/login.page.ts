import { Component, OnInit } from '@angular/core';

import { MenuController, IonSlides, PopoverController } from '@ionic/angular';

import { NgForm } from '@angular/forms';

import { LoginService } from '../../services/login/login.service';
import { CommonService } from '../../services/common/common.service';
import { UsernamePopoverComponent } from '../../components/login/username-popover/username-popover.component';
import { GetPwdPopoverComponent } from '../../components/login/get-pwd-popover/get-pwd-popover.component';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
// import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage {
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(
    private commonService: CommonService,
    private loginService: LoginService,
    private nativeStorage: NativeStorage,
    private sideMenu: MenuController,
    private popoverController: PopoverController
    // private faio: FingerprintAIO,
    // private androidFingerprintAuth: AndroidFingerprintAuth
  ) { }

  ngOnInit() {
    //    nascondo il menu
    this.sideMenu.enable(false);
  }

  // ON LOGIN SENDS ACCESS DATA TO AUTH SERVICE
  onLogin(form: NgForm) {
    this.commonService.presentLoading('Sto caricando…');

    // CALL AUTHENTICATION SERVICE
    this.loginService.login(form);
  }

  async usernamePopover(ev: Event) {
    const popover = await this.popoverController.create({
      component: UsernamePopoverComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      keyboardClose: false
    });
    return await popover.present();
  }

  async getpwdPopover(ev: Event) {
    const popover = await this.popoverController.create({
      component: GetPwdPopoverComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  /*
  showFingerprintAuthDlg(){
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
  */
}