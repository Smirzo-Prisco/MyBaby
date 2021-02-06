import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Network } from '@ionic-native/network/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Camera, CameraOptions } from '@ionic-native/camera';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { UsernamePopoverComponent } from './components/login/username-popover/username-popover.component'
import { GetPwdPopoverComponent } from './components/login/get-pwd-popover/get-pwd-popover.component';

@NgModule({
  declarations: [
    AppComponent,
    UsernamePopoverComponent,
    GetPwdPopoverComponent
  ],
  entryComponents: [
    UsernamePopoverComponent,
    GetPwdPopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseX,
    NativeStorage,
    HTTP,
    Network,
    YoutubeVideoPlayer,
    Camera,
    // FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
