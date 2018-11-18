import {Component} from '@angular/core';
import { RestApiService } from '../service/rest-api/rest-api.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

// import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  countries: any[];
  loadedCountries: any[];
  movies: any;
  loadedMovies: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, 
    private router: Router, 
    public rest: RestApiService) {
    this.getCountries();
    this.getMovies();
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
    this.movies = this.loadedMovies;
  }

  getItems(event) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = event.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.movies = this.movies.results.filter((v) => {
      if(v.title && q) {
        if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.movies.length);
  
  }

  public searchGet(event){
    console.log(event);
  }

  public search(event){
    console.log(event);
    this.router.navigate(["./search-results", { movie: this.movies }]);
  }
}
