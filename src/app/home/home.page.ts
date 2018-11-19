import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  errorMessage: string;
  searchTerm: string;

  constructor(
    private router: Router) {
  }

  search(){
    this.router.navigate(["./search-results", { searchTerm: this.searchTerm }]);
  }
}
