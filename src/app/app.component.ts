import { Component } from '@angular/core';

import { Events, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Network } from '@ionic-native/network/ngx';

import { Router } from '@angular/router';

import { CommonService } from './services/common/common.service';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Timeline',
      url: '/timeline',
      icon: 'home',
      type: 'regular'
    },
    {
      title: 'Gallery',
      url: '/gallery',
      icon: 'home',
      type: 'regular'
    },
    {
      title: 'Profilo',
      url: '/profile',
      icon: 'person',
      type: 'config'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'power',
      type: 'config'
    },
    {
      title: 'Impostazioni notifiche',
      url: '/notificationConfig',
      icon: 'settings',
      type: 'config'
    }
  ];

  offline: any;
  validateSubscription;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private firebaseX: FirebaseX,
    private nativeStorage: NativeStorage,
    private http: HTTP,
    private network: Network,
    private events: Events,
    private router: Router,
    private commonService: CommonService,
    private loginService: LoginService
  ) {
    this.initializeApp();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //  controllo la connessione dell'utente
      this.commonService.checkConnection();

      let header = '';
      let message = '';
      let presentAlert = false;

      this.goToLogin();

      this.firebaseX.getToken()
          .then(token => {
            console.log('Firebase TOKEN: ' + token);

            if(token != null && token != '' && !this.offline) {
              this.loginService.validate(true, token);
            } else {
              console.log('TOKEN non valido');

              this.goToLogin();
            }

            console.log('Saving token in the storage...');
            this.nativeStorage.setItem('userInfo', {firebaseToken: token});

            // INVIA TOKEN ALL'ANAGRAFICA UTENTI SUL DATABASE
            /*
            if(token != null && token != '' && token != undefined) {
              this.loginService.updateUserToken(token);
            }
            */
          }) // save the token server-side and use it to push notifications to this device
          .catch(error => {
            console.error('Errore nel recupero del token', error);

            this.goToLogin();
          });

      this.firebaseX.onTokenRefresh()
        .subscribe((token: string) => {
          this.nativeStorage.getItem('userInfo')
            .then(
                data => {
                  if(data.firebaseToken != token) {
                    console.log('Il token è cambiato!!!');
                    // AGGIORNA TOKEN ALL'ANAGRAFICA UTENTI SUL DATABASE
                    /*
                    if(token != null && token != '' && token != undefined) {
                      this.loginService.updateUserToken(token);
                      console.log('Nuovo token da Firebase ' + token);
                    }
                    */
                  }
                },
                error => {
                  console.error(error)
                }
            )
        });



      // this.statusBar.styleDefault();
      //
      // //  Annuncio Firebase Cloud Messaging
      // this.firebaseX.getToken()
      //   .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      //   .catch(error => console.error('Error getting token', error));
      //
      // this.firebaseX.onMessageReceived()
      //   .subscribe(data => console.log(`User opened a notification ${data}`));
      //
      // this.firebaseX.onTokenRefresh()
      //   .subscribe((token: string) => console.log(`Got a new token ${token}`));
      // //  END Annuncio Firebase Cloud Messaging
      //
      // //  Local Storage
      // this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
      //   .then(
      //     () => console.log('Stored item!'),
      //     error => console.error('Error storing item', error)
      //   );
      //
      // this.nativeStorage.getItem('myitem')
      //   .then(
      //     data => console.log(data),
      //     error => console.error(error)
      //   );
      // //  END  Local Storage
      //
      // //  HTTP
      // const params = { act: 'set_login' }
      // this.http.get(environment.BASEURL + 'app/router.php', {}, {})
      // .then(data => {
      //     console.log('HTTP data:', data);
      //     console.log(data.status);
      //     console.log(data.data); // data received by server
      //     console.log(data.headers);
      // })
      // .catch(error => {
      //     console.log('error status', error.status);
      //     console.log(error.error); // error message as string
      //     console.log(error.headers);
      //
      // });
      //  END    HTTP
    });
  }
}
// #eb-8kgpPOZk:APA91bEWFfYc7ronv5qLZpANWUc0lwZLnl8OLhih4YwRBbPc2Ba3BDJke0XgvS-79mbqmyT0cqEpm6SZHtRONx5PvgZ-fTKuxeVlE6Sv8qTmZUhUjUwOrAYHR1Ql2mq_Jjc7SUzf8Qqb personale
// fyDqIgpgBPw:APA91bHpIEwjcI00EMeC4Nd67XmeiikNvnuYrtkpokUPubd0zZzmQKF901kEh6abUsdb2BP11CciVUp4CGas9rLXBo586m7U5gDAHwJwHKiqQONh1HfxUmDifU72Ze-SxQJ2JEulDxH0  lavoro
// eoJQ1XQ2rU8:APA91bG0Asff_Gns8HeP3bSX-hwtboeqUhYQfV22GAZl-xA4R1Y5CHuXd20IKBbTZxyWDSjbSSyU81f_jYs0Ng_w49A9Oh7A8PEbt1Wn1O2rA-o8W9S4JXaHON_ySTWjG0BxUcccCQTJ  emulatore
