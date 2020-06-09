import { Injectable } from '@angular/core';
import { Events, AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from "@angular/router";

import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    token: string = null;
    username: string;
    password: string;
    remember: boolean;
    savePassword: boolean;

    constructor(
      public events: Events,
      private http: HTTP,
      private router: Router,
      private nativeStorage: NativeStorage,
      private commonService: CommonService
    ) {}

    // SET OR UPDATE NOTIFICATION TOKEN OF CURRENT DEVICE
    updateUserToken(data) {
        const params = {
            userId: data.userId,
            token: data.firebaseToken,
            act: 'update_user_token'
        }

        return this.http.post(environment.BASEURL + 'app/router.php', params, {})
          .then((response) => {
            console.log(response.data);

            if(response.data == 'ok') {
                this.router.navigateByUrl('/timeline');
            } else {
                this.router.navigateByUrl('/login');
            }
          })
    }

    goHome(userInfo){
        this.nativeStorage.getItem('userInfo')
            .then(
                data => {
                    data['userId'] = userInfo.userId;
                    data['admin'] = userInfo.admin;
                    data['fingerPrint'] = userInfo.fingerPrint;

                    console.log(data);

                    this.nativeStorage.setItem('userInfo', data);
                    this.updateUserToken(data);
                },
                error => { console.error(error) }
            )
    }

    login(form) {
        const operation = "authenticate";

        this.username = form.value.username;
        this.password = form.value.password;
        this.remember = form.value.rememberMe;
        this.savePassword = form.value.rememberMe;

        const params = {
            // operation: operation,
            // deviceid: this.deviceid,
            // secondarydeviceid: this.secondarydeviceid,
            // idapp: this.idapp,
            act: 'set_login',
            login_usr: this.username,
            login_pwd: this.password
        }

        return this.http
            .post(environment.BASEURL + 'app/router.php', params, {})
            .then((data) => {
                let response = JSON.parse(data.data);

                console.log('accesso:', response.errNo);

                switch (response.errNo) {
                    case 1:   //  utente errato
                        this.commonService.presentAlert('Utente non riconosciuto');
                        break;
                    case 2:   //  password errata
                        this.commonService.presentAlert('Password errata');
                        break;
                    case 3:   //  utente corretto, password vuota
                        this.goHome(response);
                        break;
                    case 4:   //  utente corretto
                        this.goHome(response);
                        break;
                }
            })
    }

    getPwd(email) {
        const params = {
          act: 'set_pwd_retrieve',
          email: email
        }

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        };

        return this.http
            .post(environment.BASEURL + 'app/router.php', params, headers)
            .then((data) => {
              console.log(data);

                this.commonService.dismissLoading();

                if(data.data == 'ok') {
                    this.commonService.presentAlert('E-mail inviata correttamente');
                } else {
                    this.commonService.presentAlert('Errore nell\'invio dell\'e-mail');
                }

              return data.data;
            })
    }

    // VALIDATE TOKEN
    validate(onStartUp: boolean, token?: string) {
        // const timestamp = moment().format('DDMMYYYYHHmmss');
        // const operation = "tokenvalid";
        // let actualToken = token ? token : this.token;
        //
        // const validateParams = {
        //     operation: operation,
        //     deviceid: this.deviceid,
        //     secondarydeviceid: this.secondarydeviceid,
        //     timestamp: timestamp,
        //     idapp: this.idapp,
        //     tokenid: actualToken
        // }
        //
        // return this.http
        //     .post('/EniWSSO/ServiceLoginRest, validateParams', {}, {})
        //     .subscribe(
        //         (response) => {
        //
        //             // IF TOKEN IS NOT VALID ANYMORE
        //             if(response['response']['ERRCODE'] == "00") {
        //
        //                 this.backendLogin(actualToken);
        //
        //             } else {
        //
        //                 if(onStartUp) {
        //                     this.events.publish('session', 'invalid');
        //                 } else {
        //                     this.events.publish('session', 'expired');
        //                 }
        //
        //
        //             }
        //
        //         })
    }

    // LOGOUT METHOD
    async logout() {
        // const alert = await this.alertController.create({
        //     header: 'Stai per terminare la tua sessione di lavoro e uscire da Easyproject',
        //     message: 'Sei sicuro di voler uscire?',
        //     mode: 'ios',
        //     buttons: [
        //         {
        //             text: 'Annulla',
        //             role: 'cancel'
        //         },
        //         {
        //             text: 'Esci',
        //             handler: () => {
        //                 this.events.publish('authentication', 'success', 'logout');
        //
        //                 setTimeout(() => {
        //                     this.loadingService.presentLoading('Sto uscendo dall\'applicazione…');
        //
        //                     // LOGOUT URL
        //                     const logoutUrl = environment.WSBASIC_URL + '/EniWSSO/ServiceLoginRest';
        //
        //                     const timestamp = moment().format('DDMMYYYYHHmmss');
        //                     const operation = "logout";
        //
        //                     let shaObj = new jsSHA("SHA-256", "TEXT", this.signature);
        //                     shaObj.update(this.salt);
        //                     shaObj.update(operation);
        //                     shaObj.update(this.deviceid);
        //                     shaObj.update(this.secondarydeviceid);
        //                     shaObj.update(timestamp);
        //                     shaObj.update(this.idapp);
        //                     shaObj.update(this.token);
        //                     let hash = shaObj.getHash("HEX");
        //
        //                     const logoutParams = {
        //                         operation: operation,
        //                         deviceid: this.deviceid,
        //                         secondarydeviceid: this.secondarydeviceid,
        //                         timestamp: timestamp,
        //                         idapp: this.idapp,
        //                         signature: hash,
        //                         tokenid: this.token
        //                     }
        //
        //                     this.http.post(logoutUrl, logoutParams)
        //                         .subscribe((response) => {
        //
        //                             // SET AUTHENTICATION:SUCCESS:LOGOUT
        //                             this.events.publish('authentication', 'success', 'logout');
        //
        //                         });
        //                 }, 500);
        //
        //             }
        //         }
        //     ]
        // })
        // PRESENT LOGOUT MODAL
        // await alert.present();
    }
}
