import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  offline: any;

  constructor(
      private network: Network,
      private alertController: AlertController,
      private loadingController: LoadingController
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

  async presentLoading(message?: string, timeInSeconds: number = 10) {

    let content = message ? message : 'Sto caricando…';

    return await this.loadingController.create({
      mode: 'ios',
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      message: content
    }).then((loading) => {
      loading.present().then(() => {
        setTimeout(() => {
          loading.dismiss();
        }, timeInSeconds * 1000);
      })
    })
  }

  async dismissLoading() {
    this.loadingController.getTop().then((value) => {
      if(value) {
        return this.loadingController.dismiss();
      } else {
        return null;
      }
    })

  }
}
