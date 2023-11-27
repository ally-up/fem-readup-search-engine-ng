import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import booksJson from 'src/assets/bookclub/books.json';

interface Book {
  title: String;
  author: String;
  month: Number;
  year: Number;
}

interface ReadingListYear {
  year: Number;
  books: Book[];
}


@Component({
  selector: 'app-bookclub',
  templateUrl: './bookclub.component.html',
  styleUrls: ['./bookclub.component.scss'],

})
export class BookclubComponent implements OnInit {


  /** App title */
  appTitle = environment.app_title;
  panelOpenState = false;
  readingLists: ReadingListYear[] = booksJson;


  constructor(private router: Router, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, ) {
    this.matIconRegistry.addSvgIcon("instagram", this.domSanitizer
    .bypassSecurityTrustResourceUrl("assets/icons/instagram.svg"));
    this.matIconRegistry.addSvgIcon("meetup2", this.domSanitizer
    .bypassSecurityTrustResourceUrl("assets/icons/meetup.svg"));
   }

  ngOnInit(): void {
    this.readingLists = this.readingLists.sort((a,b) => (a.year > b.year ? -1 : 1));
  }

  onBackClicked() {
    this.router.navigate(['/overview']);
  }

}
