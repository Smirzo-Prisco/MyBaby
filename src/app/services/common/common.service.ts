import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  offline: any;

  constructor(
      private network: Network,
      private alertController: AlertController
  ) { }

  async presentAlert(header?: string, message?: string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: header,
      message: message,
      buttons: ['Ok']
    })
    await alert.present()
  }

  checkConnection() {
    this.network.onDisconnect().subscribe(() => {
      this.offline = true;
    });
    // disconnectSubscription.unsubscribe();

    this.network.onConnect().subscribe(() => {
      this.offline = false;
    });
    // connectSubscription.unsubscribe();
  }
}
