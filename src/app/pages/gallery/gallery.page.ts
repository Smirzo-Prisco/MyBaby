import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { environment } from '../../../environments/environment';
import {CommonService} from "../../services/common/common.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})
export class GalleryPage implements OnInit {
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

    public items: Array<any>;
    public env: any;
    public to: any;

    constructor(
        private dataService: DataService,
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.commonService.presentLoading();

        this.dataService.getGalleryItems(0)
            .then((data) => {
                console.log(data);
                this.items = data;
                this.env = environment;

                this.commonService.dismissLoading();
            });
    }

    loadData(event) {
        setTimeout(() => {
            let itemsLength = this.items.length;
            console.log('Done', itemsLength);

            this.commonService.presentLoading();

            this.dataService.getGalleryItems(itemsLength)
                .then((data) => {
                    console.log(data);

                    for (let i = 0; i < 25; i++) {
                        this.items.push(data[i]);
                    }

                    this.commonService.dismissLoading();
                });

            event.target.complete();
        }, 300);
    }

    trackList(index, item) {
        return item ? item.id : index;
    }
}
