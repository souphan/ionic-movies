import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api/rest-api.service';
import { NavController } from '@ionic/angular';

import { Router } from '@angular/router';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  countries: any[];
  loadedCountries: any[];
  movies: any;
  loadedMovies: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, 
    private router: Router, 
    public rest: RestApiService) {
  }

  getCountries() {
    this.rest.getCountries()
       .subscribe(
         countries => {
           this.countries = countries;
           this.loadedCountries = countries;
           
        },
         error =>  this.errorMessage = <any>error);
  }

  getMovies() {
    this.rest.getMovies()
       .subscribe(
         movies => {
           this.movies = movies;
           this.loadedMovies = movies;
           
        },
         error =>  this.errorMessage = <any>error);
  }

  initializeItems(): void {
    this.countries = this.loadedCountries;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.countries = this.countries.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.countries.length);
  
  }

  public search(){
    this.router.navigate(["./search-results"]);
  }

}
