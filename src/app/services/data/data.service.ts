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

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    };

    return this.http
      .post(environment.BASEURL + 'app/router.php', params, headers)
      .then((data) => {
        console.log(data);
        return JSON.parse(data.data);
      })
  }

  getGalleryItems(from, to) {
    const params = {
      act: 'get_gallery_items',
      from: from,
      to: to
      // userId: this.nativeStorage.getItem('userInfo').then( data => { return data.userId } )
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    };

    return this.http
        .post(environment.BASEURL + 'app/router.php', params, headers)
        .then((data) => {
          return JSON.parse(data.data);
        })
  }

  openMultimedia(id, type) {
    const params = {
      act: 'get_single_multimedia',
      userId: this.nativeStorage.getItem('userInfo').then( data => { return data.userId } ),
      id: id,
      type: type
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    };

    return this.http
        .post(environment.BASEURL + 'app/router.php', params, headers)
        .then((data) => { return JSON.parse(data.data); })
  }
}