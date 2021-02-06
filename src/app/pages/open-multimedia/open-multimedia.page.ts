import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { environment } from '../../../environments/environment';
import { CommonService } from "../../services/common/common.service";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { NgForm } from '@angular/forms';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-open-multimedia',
    templateUrl: './open-multimedia.page.html',
    styleUrls: ['./open-multimedia.page.scss'],
})

export class OpenMultimediaPage implements OnInit {
    id = null;
    type = '';
    public item: any;
    public env: any;
    like = false;
    likeToggleIcon = 'heart';
    text = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private commonService: CommonService,
        private nativeStorage: NativeStorage,
        private youtube: YoutubeVideoPlayer,
        private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.data['multimedia']);

    this.commonService.checkConnection();
    this.item = this.activatedRoute.snapshot.data['multimedia'];
    this.env = environment;
    this.like = this.item.likeDetails.me;
    this.toggleLikeIcon();
  }

  sanitizeUrl(yt_id){
      let ytParams = '?showinfo=0&frameborder=0&iv_load_policy=3&modestbranding=1&rel=0&autoplay=1&playsinline=0';

      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + yt_id + ytParams);
  }

  setLike(id, type) {
    this.dataService.setLike(id, type, this.like);
    this.like = !this.like;
    this.toggleLikeIcon();
  }

  toggleLikeIcon(): void {
    if(!this.like) {
      this.likeToggleIcon = 'heart-empty';
    } else {
      this.likeToggleIcon = 'heart';
    }
  }

  setComment(form: NgForm, id) {
    this.commonService.presentLoading('Invio…');

    //  prendo le informazioni dell'utente dal local storage
    this.nativeStorage.getItem('userInfo').then( data => {
        var author = data.userKinship + ' ' + data.userFirst;

        //  salvo il commento
        this.dataService.setComment(form, id, data.userId, author);

        // lo accodo alla vista
        this.item.comments.push({
            author: {
                user_kinship: data.userKinship,
                user_first: data.userFirst
            },
            text: form.value.text,
            time: 0
        });
    })
  }
}