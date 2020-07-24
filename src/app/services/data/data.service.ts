import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';
import { Router } from "@angular/router";

import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common/common.service';
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
  };

  constructor(
      private http: HTTP,
      private router: Router,
      private nativeStorage: NativeStorage,
      private commonService: CommonService
  ) { }

  getTimeline(from, to) {
    const params = {
      act: 'get_timeline_from_app',
      from: from,
      to: to
    }

    return this.http
      .post(environment.BASEURL + 'app/router.php', params, this.headers)
      .then((data) => {
        return JSON.parse(data.data);
      })
  }

  getGalleryItems(from, to) {
    return this.nativeStorage.getItem('userInfo').then( data => {
      const params = {
        act: 'get_gallery_items',
        userId: data.userId,
        from: from,
        to: to
      }

      return this.http
          .post(environment.BASEURL + 'app/router.php', params, this.headers)
          .then((data) => {
            return JSON.parse(data.data);
          })
    })
  }

  openMultimedia(id, type) {
    return this.nativeStorage.getItem('userInfo').then( data => {
      const params = {
        act: 'get_single_multimedia',
        userId: data.userId,
        id: id,
        type: type
      }

      return this.http
          .post(environment.BASEURL + 'app/router.php', params, this.headers)
          .then((data) => { return JSON.parse(data.data); })
    })
  }

  setLike(id, type, like) {
    this.nativeStorage.getItem('userInfo').then( data => {
      let act = 'set_unlike';

      if(!like) act = 'set_like';

      const params = {
        act: act,
        userId: data.userId,
        obj: id,
        type: type
      }

      return this.http
          .post(environment.BASEURL + 'app/router.php', params, this.headers)
          .catch(function(error) {
            console.log(error);
          })
          .then((data) => { console.log(data); })
    })
  }
}