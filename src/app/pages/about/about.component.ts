import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  /** App title */
  appTitle = environment.app_title;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBackClicked() {
    this.router.navigate(['/overview']);
  }

}
