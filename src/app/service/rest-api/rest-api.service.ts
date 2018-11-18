import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // API URL Kids Movies Query with TMDB API key
  private apiUrlMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=4289f6af9e16ad04c8be0e5c512c7397&language=en-US&sort_by=popularity.desc&certification_country=US&certification.lte=G&sort_by=popularity.desc';

  constructor(private http:HttpClient) { }

  public getMovies() {
    return this.http.get(this.apiUrlMovies)
    .pipe(
      map(res => {
        return res.results;
      })
    ).pipe(
      catchError((error) => {
        // Do messaging and error handling here
        return this.handleError(error);
      })
    )
  }
  
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
