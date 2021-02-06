import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { environment } from '../../../environments/environment';
import { CommonService } from "../../services/common/common.service";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public item: any;
  public env: any;
  image:any = '';
  imageData:any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private commonService: CommonService,
    private nativeStorage: NativeStorage,
    private camera: Camera,
    // private transfer: FileTransfer,
  ) { }

  ngOnInit() {
    console.log('snapshot:', this.activatedRoute.snapshot.data);

    this.commonService.checkConnection();
    this.item = this.activatedRoute.snapshot.data['profile'];
    this.env = environment;

    this.commonService.presentLoading();

    this.dataService.getProfile()
      .then((data) => {
          console.log('PROFILE PAGE TS', data);

          this.item = data;
          this.env = environment;

          this.commonService.dismissLoading();
      });
  }


  openCam(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //alert(imageData)
     this.imageData=imageData
     this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
     // Handle error
     alert("error "+JSON.stringify(err))
    });
  }
/*
  async upload() {
    this.commonService.presentLoading();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
       fileKey: 'file',
       fileName: 'name.jpg',
       headers: {}
    }

    fileTransfer.upload(this.imageData, 'http://192.168.0.102/io3/upload.php', options1)
      .then((data) => {
        this.commonService.dismissLoading();
        alert("success");
      },
      (err) => { alert("error"+JSON.stringify(err)); });
  }
*/
}