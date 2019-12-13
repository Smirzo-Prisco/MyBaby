import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      public events: Events,
      private nativeHttp: HTTP,
      private nativeStorage: NativeStorage
  ) {}

  // SET OR UPDATE NOTIFICATION TOKEN OF CURRENT DEVICE
  updateUser(token) {
    this.nativeStorage.getItem('userId').then((userId) => {
      const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
      return this.nativeHttp.post("/src/sys_user/update_notification_token/" + userId, { 'notification_token': token }, { headers: headers })
          .subscribe((response) => {
            console.log(response);
          })
    })


    this.nativeStorage.getItem('userInfo')
        .then(
            data => {
              console.log(data);

              return this.nativeHttp.post("/src/sys_user/update_notification_token/" + userId, { 'notification_token': token }, { /*headers: headers*/ })
                  .subscribe((response) => {
                    console.log(response);
                  })
            },
            error => {
              console.error(error)
            }
        );
  }
}
