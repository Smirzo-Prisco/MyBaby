import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseX: FirebaseX,
    private nativeStorage: NativeStorage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //  Annuncio Firebase Cloud Messaging
      this.firebaseX.getToken()
        .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
        .catch(error => console.error('Error getting token', error));

      this.firebaseX.onMessageReceived()
        .subscribe(data => console.log(`User opened a notification ${data}`));

      this.firebaseX.onTokenRefresh()
        .subscribe((token: string) => console.log(`Got a new token ${token}`));
      //  END Annuncio Firebase Cloud Messaging

      //  Local Storage
      this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );

      this.nativeStorage.getItem('myitem')
        .then(
          data => console.log(data),
          error => console.error(error)
        );
      //  END  Local Storage
    });
  }
}
// #eb-8kgpPOZk:APA91bEWFfYc7ronv5qLZpANWUc0lwZLnl8OLhih4YwRBbPc2Ba3BDJke0XgvS-79mbqmyT0cqEpm6SZHtRONx5PvgZ-fTKuxeVlE6Sv8qTmZUhUjUwOrAYHR1Ql2mq_Jjc7SUzf8Qqb personale
// fyDqIgpgBPw:APA91bHpIEwjcI00EMeC4Nd67XmeiikNvnuYrtkpokUPubd0zZzmQKF901kEh6abUsdb2BP11CciVUp4CGas9rLXBo586m7U5gDAHwJwHKiqQONh1HfxUmDifU72Ze-SxQJ2JEulDxH0  lavoro