import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { environment } from '../../../environments/environment';
import { CommonService } from "../../services/common/common.service";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})

export class GalleryPage implements OnInit {
    public items: Array<any>;
    public env: any;
    public to: any;

    constructor(
        private dataService: DataService,
        private commonService: CommonService,
        private youtube: YoutubeVideoPlayer,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
      this.commonService.checkConnection();

      this.to = 8;

      console.log(0, this.to);

      this.commonService.presentLoading();

      this.dataService.getGalleryItems(0, this.to)
          .then((data) => {
              console.log(data);

              this.items = data;
              this.env = environment;

              this.commonService.dismissLoading();
          });
    }

    sanitizeUrl(yt_id){
        let ytParams = '?showinfo=0&controls=2&fs=0&frameborder=0&iv_load_policy=3&modestbranding=1&rel=0';

        return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + yt_id + ytParams);
    }

    refreshGallery(event) {
        setTimeout(() => {
            this.dataService.getGalleryItems(0, this.to)
            .then((data) => {
                console.log(data);

                this.items = data;
                this.env = environment;

                this.commonService.dismissLoading();
            });

            event.target.complete();
        }, 300);
    }

    loadDataGallery(event) {
      setTimeout(() => {
          let itemsLength = this.items.length;
          console.log('Done', itemsLength);

          this.commonService.presentLoading();

          this.dataService.getGalleryItems(itemsLength, this.to)
              .then((data) => {
                  console.log(data);

                  for (let i = 0; i < this.to; i++) {
                      this.items.push(data[i]);
                  }

                  this.commonService.dismissLoading();
              });

          event.target.complete();
      }, 300);
    }

    trackListGallery(index, item) {
      return item ? item.id : index;
    }
}