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
    this.getAllPets(this.numbA, this.numbB);
    this.toTop();
  }

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  getAllPets(a, b): void {
    this.serviceHome.getAllListPets().subscribe((res) => {
      if (res && res.pets !== '') {
        this.dataListCard = res.pets.splice(a, b);
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
    this.getAllPets(this.numbA, this.numbB);
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
    this.getAllPets(this.numbA, this.numbB);
  }
  //#endregion
}
