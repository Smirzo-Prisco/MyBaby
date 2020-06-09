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
  name = '';
  description = '';
  public items: Array<any>;
  public env: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private commonService: CommonService,
    private youtube: YoutubeVideoPlayer,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.description = this.activatedRoute.snapshot.paramMap.get('description');
    this.env = environment;
    this.commonService.presentLoading();

    console.log(this.id);
    console.log(this.type);
    console.log(this.name);
    console.log(this.description);

    this.dataService.openMultimedia(this.id, this.type)
        .then((data) => {
            console.log(data);

            this.items = data;
            this.commonService.dismissLoading();
        });
  }

  sanitizeUrl(yt_id){
      let ytParams = '?showinfo=0&frameborder=0&iv_load_policy=3&modestbranding=1&rel=0&autoplay=1&playsinline=0';

      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + yt_id + ytParams);
  }
}