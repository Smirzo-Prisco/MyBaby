import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { environment } from '../../../environments/environment';
import { CommonService } from "../../services/common/common.service";
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

constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private commonService: CommonService,
    private youtube: YoutubeVideoPlayer,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.data['multimedia']);

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
  }

  toggleLikeIcon(): void {
    if(!this.like) {
      this.likeToggleIcon = 'heart-outline';
    } else {
      this.likeToggleIcon = 'heart';
    }
  }
}