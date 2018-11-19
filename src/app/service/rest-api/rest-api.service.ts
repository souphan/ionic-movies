import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // API URL Kids Movies Query with TMDB API key
  private apiUrlMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=4289f6af9e16ad04c8be0e5c512c7397&language=en-US&sort_by=popularity.desc&certification_country=US&certification.lte=G&include_adult=false&include_video=false&page=';

  constructor(private http:HttpClient) { }

  // Rest API that uses TMDB Discover API to retrieve all kid movies rated G.
  public getMovies(page?) {
    return this.http.get(this.apiUrlMovies + page)
    .pipe(
      map(res => {
        return res;
      })
    ).pipe(
      catchError((error) => {
        // Do messaging and error handling here
        return this.handleError(error);
      })
    )
  }
  
  // Error handler
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
