import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-outlet-right',
  templateUrl: './outlet-right.component.html',
  styleUrls: ['./outlet-right.component.scss'],
})
export class OutletRightComponent implements OnInit {
  public http = environment.apiUrl;
  tokenChecked;
  public dataProfile;

  constructor() {}

  ngOnInit(): void {
    this.tokenChecked = localStorage.getItem('token');
  }
}
