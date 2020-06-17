import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private addMoviePathUrl = environment.apiUrl + '/Movie/Add/';
  private getAllMoviesUrl = environment.apiUrl + '/Movie/AllMovies';
  private getMovieByImdbIdUrl  = environment.apiUrl + '/Movie/GetMovieByImdbId/';

  private movies$: Observable<Movie[]>;
  private movie$: Observable<Movie>;

  constructor(private http: HttpClient) { }

  // Admin
  addMovie(title){
    return  this.http.post(this.addMoviePathUrl + title, null);
  }

  // User
  getMovies() : Observable<Movie[]>{
    if(!this.movies$){
      this.movies$ = this.http.get<Movie[]>(this.getAllMoviesUrl).pipe(shareReplay());
    }
    return this.movies$;
  }

  getMovieByImdbId(ImdbId) : Observable<Movie>{
    this.movie$ = this.http.get<Movie>(this.getMovieByImdbIdUrl + ImdbId).pipe(shareReplay());
    return this.movie$;
  }

  get currentToken(){
    return this.movies$;
  }

  clearCache(){
    this.movies$ = null;
  }

}
