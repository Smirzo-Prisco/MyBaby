import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { environment } from '../../../environments/environment';
import {CommonService} from "../../services/common/common.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  // public items: Array<{ img: string; author: string; description: string; date: string; }> = [];
  public items: Array<any>;
  public env: any;
  public to: any;

  constructor(
      private dataService: DataService,
      private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commonService.presentLoading();
    this.to = 10;

    console.log(0, this.to);

    this.dataService.getTimeline(0, this.to)
      .then((data) => {
        console.log('TIMELINE:', data);

        this.items = data;
        this.env = environment;

        this.commonService.dismissLoading();
      });
  }

  loadDataTimeline(event) {
    setTimeout(() => {
        let itemsLength = this.items.length;
        console.log('Done', itemsLength);

        this.commonService.presentLoading();

        this.dataService.getTimeline(itemsLength, this.to)
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

  trackListTimeline(index, item) {
    return item ? item.id : index;
  }
}