import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { shareReplay, flatMap, first } from 'rxjs/operators';

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
  addMovie(imdbId){
    return  this.http.post(this.addMoviePathUrl + imdbId, null);
  }

  // User
  getMovies() : Observable<Movie[]>{
    if(!this.movies$){
      this.movies$ = this.http.get<Movie[]>(this.getAllMoviesUrl).pipe(shareReplay());
    }
    console.log(this.movies$);
    return this.movies$;
  }

  getMovieById(id :number) : Observable<Movie>{
    return this.getMovies().pipe(flatMap(result => result), first(movie => movie.id == id));
  }

  get currentToken(){
    return this.movies$;
  }

  clearCache(){
    this.movies$ = null;
  }

}
