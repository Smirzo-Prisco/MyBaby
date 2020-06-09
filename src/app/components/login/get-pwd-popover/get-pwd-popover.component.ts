import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-get-pwd-popover',
  templateUrl: './get-pwd-popover.component.html',
  styleUrls: ['./get-pwd-popover.component.scss'],
})
export class GetPwdPopoverComponent implements OnInit {
  email = '';

  constructor(
    private commonService: CommonService,
    private loginService: LoginService
  ) { }

  ngOnInit() {}

  getPwd() {
    console.log(this.email);

    this.commonService.presentLoading('Sto caricando…');

    // CALL AUTHENTICATION SERVICE
    this.loginService.getPwd(this.email);
  }
}