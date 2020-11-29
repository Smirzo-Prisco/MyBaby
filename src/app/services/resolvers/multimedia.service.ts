import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  constructor(private http: HTTP, private nativeStorage: NativeStorage) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    const type = route.paramMap.get('type');

    return this.nativeStorage.getItem('userInfo').then( data => {
        const params = {
          act: 'get_single_multimedia',
          userId: data.userId,
          id: id,
          type: type
        }

        const headers = {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        };

        return this.http
            .post(environment.BASEURL + 'app/router.php', params, headers)
            .then((data) => { return JSON.parse(data.data); })
    } )


  }
}