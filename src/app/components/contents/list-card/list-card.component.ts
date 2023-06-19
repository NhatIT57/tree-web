import { environment } from './../../../../environments/environment';
import { HomeService } from './../../../services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  public http = environment.apiUrl;

  dataListCard: any;
  countListCard;
  listpagination = [];

  currentPageNumber = 1;
  numbA = 0;
  numbB = 9;
  constructor(private serviceHome: HomeService) {}

  ngOnInit(): void {
    this.getAllFlower(this.numbA, this.numbB);
    this.toTop();
  }

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  getAllFlower(a, b): void {
    this.serviceHome.getAllListFlower().subscribe((res) => {
      if (res && res.Flower !== '') {
        this.dataListCard = res.trees.splice(a, b);
        for (let index = 0; index < this.dataListCard.length; index++) {
            if (this.dataListCard[index].picture) {
              this.dataListCard[index].picture = this.http + "/" + this.dataListCard[index].picture;
            }
        }
        this.countListCard = res.count;
      }
    });
  }

  nextPagination(): void {
    if (this.numbB > this.countListCard) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.numbA += 9;
    this.numbB += 9;
    // this.goToPage(this.currentPageNumber + 1);
    this.getAllFlower(this.numbA, this.numbB);
  }
  previousPagination(): void {
    if (this.numbA === 0) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.numbA -= 9;
    this.numbB -= 9;
    this.getAllFlower(this.numbA, this.numbB);
  }
  //#endregion
}
