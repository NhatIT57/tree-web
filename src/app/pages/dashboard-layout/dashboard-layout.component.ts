import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  scroll;

  constructor() {}

  ngOnInit(): void {
    // window.addEventListener('scroll', this.scrolling, true);
  }
  // scrolling = (s) => {
  //   const sc = s.target.scrollingElement?.scrollTop || 0;
  //   // console.log(sc);
  //   if (sc >= 100) {
  //     this.scroll = true;
  //   } else {
  //     this.scroll = false;
  //   }
  //   // tslint:disable-next-line:semicolon
  // };
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    // window.removeEventListener('scroll', this.scrolling, true);
  }
}
