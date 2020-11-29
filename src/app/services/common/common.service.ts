import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  offline: any;

  constructor(
      private network: Network,
      private alertController: AlertController,
      private loadingController: LoadingController,
      private http: HTTP
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

  async presentLoading(message?: string, timeInSeconds: number = 100) {
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


  //  invio notifiche push
  async send_push_notification(text, tokens){
      console.log(text, tokens);

      const data = {
          // "to":"fTS9ZjUCIX8:APA91bE_suTA6X51vJW-g0oypggBnIeWqGA8TS0CdTsR8uPoz9QSwSG-O4AbGlDaZAIqIy65tx1DUBizh8jzBiPxzhqZsw2hCaOaYVDkl24mtJWN1X7__OK7L_CZI_nhYo676mbfikJA",
          //  "to": "eWI7SXdDaXs:APA91bGeeqi36jwhB746zscv6eqcav1Dq9np05l_5zoCx074EH2hOUYAl5Fo3h5axvPHmTUCtzNnmrTcsItuNZQ6Tb5oBbDYfBBBtluU6BfvzyOGuLbAHBdKvNeFgF6QnOrJqSR63RNV",
          "registration_ids": ["fTS9ZjUCIX8:APA91bE_suTA6X51vJW-g0oypggBnIeWqGA8TS0CdTsR8uPoz9QSwSG-O4AbGlDaZAIqIy65tx1DUBizh8jzBiPxzhqZsw2hCaOaYVDkl24mtJWN1X7__OK7L_CZI_nhYo676mbfikJA"],
          // "registration_ids": tokens,
          "priority": "high",
          "notification": {
                "title": "Lavinia e Lucrezia",
                "subtitle": "Hai nuovi contenuti da visualizzare!",
                "body": text
          },
          "data":{
            "landing_page":"gallery",
            "price":"$3,000.00"
          },
      };


/*
        const data = {
          // registration_ids: ["ehetMXe7hSI:APA91bFQiV1aOfroPIEVsFWML0FzqbGePoZ30QNw4mJE4SJkwtpYjbOffL5Cuo0Or33sYN7BLBiwInlYoqd2J6tNeng--JlogxVJwCc577RzVDmgEbjOAq_pvPQ0v_sD1Ltfm-7TFmXd", "eWI7SXdDaXs:APA91bGeeqi36jwhB746zscv6eqcav1Dq9np05…oBbDYfBBBtluU6BfvzyOGuLbAHBdKvNeFgF6QnOrJqSR63RNV"],
          "registration_ids": tokens,
          "priority": "high",
          "notification": {
              "title": "Lavinia e Lucrezia",
              "subtitle": "Hai nuovi contenuti da visualizzare!",
              "body": text,
              "imageUrl": "http://lavinia.robertobottini.com/img/lav/002.jpg"  //   http://lavinia.robertobottini.com/img/lav/002.jpg
          }
        };
*/

      console.log('i dati che passo:', data);

      //  invio la notifica push
      const headers = {
        "Content-Type":"application/json",
        "Authorization":"key=AAAAa1RU9SM:APA91bHQItbWefch4ayIF6MMqZP7ktci5rwCa1he0_6G0VNLtFUp4czNjjHgIQemioGzivJn6GzUAligeCZjREgKzq79PcGFvSGsG_OJaLgjgL9e6bFKSCciNzf9qsTvLMT-LyBEMdFk"
      };

      return this.http
          .post("https://fcm.googleapis.com/fcm/send", data, headers)
          .then((data) => {
              console.log(data);
          });
  }
}