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
  movies: any;
  loadedMovies: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, 
    private router: Router, 
    public rest: RestApiService) {
    this.getMovies();
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

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.movies = this.movies.filter((v) => {
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
    this.router.navigate(["./search-results", { movie: event }]);
  }
}
