import { Component } from '@angular/core';
import { RestApiService } from '../service/rest-api/rest-api.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  // Store movie to list search result in template
  movies: any;

  // Search string we get from previous route
  private searchTerm: string;

  // I'm going to page through 10 pages, because there are too many kid movies being returned for a frontend application.
  private totalPages = 10;

  // Store movies array here
  private movieResults = [];

  // Start page count at 1
  private pageCount = 1;

  // Capture error message
  errorMessage: string;
  
  
  constructor(
    private route: ActivatedRoute,
    public rest: RestApiService) {
      if(this.route.snapshot.params) {
        // Capture search term from entry from previous route
        this.searchTerm = this.route.snapshot.params.searchTerm;
      } 
      // Get all kid movies
      this.getMovies();
  }

  // API call to get kid movies using API service. 
  // We are only getting 10 pages of kid movies instead of the entire result. Be better on backend
  getMovies(page?) {
    this.rest.getMovies(page)
       .subscribe(
         movies => {
          if(this.pageCount >= this.totalPages){
            this.movies = this.movieResults;
            this.getItems(this.searchTerm)
          } else {
            
            if (this.movieResults.length >= 1){
              for(const m of movies['results']){
                this.movieResults[0].push(m);
              }
            } else {
              this.movieResults.push(movies['results']);
            }
            this.getMoviesPaging(this.pageCount)
          }
           
        },
         error =>  this.errorMessage = <any>error);
  }

  // Keep count of page, and continue running getMovies method until you reach 10 pages.
  private getMoviesPaging(count){
    if (count >= this.pageCount){
      this.pageCount = this.pageCount +1;
      this.getMovies(this.pageCount)
    }
  }

  // Filter movie listing that returns the string in searchTerm
  getItems(searchTerm) {
    // if the value is an empty string don't filter the items
    if (!searchTerm) {
      return;
    }
  
    this.movies = this.movies[0].filter((v) => {
      if(v.title && searchTerm) {
        if (v.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(searchTerm, this.movies.length);
  
  }

}
