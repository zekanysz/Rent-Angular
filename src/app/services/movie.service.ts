import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { Credits } from '../interfaces/credits';
import { shareReplay, flatMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private addMoviePathUrl = environment.apiUrl + '/Movie/Add/';
  private getAllMoviesUrl = environment.apiUrl + '/Movie/AllMovies';
  private getAllCreditsUrl = environment.apiUrl + '/Movie/AllCredits';

  private movies$: Observable<Movie[]>;
  private movie$: Observable<Movie>;

  private creditsAll$: Observable<Credits[]>;
  private credits$: Observable<Credits>;

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


  getAllCredits() : Observable<Credits[]>{
    if(!this.creditsAll$){
      this.creditsAll$ = this.http.get<Credits[]>(this.getAllCreditsUrl).pipe(shareReplay());
    }
    console.log(this.creditsAll$);
    return this.creditsAll$;
  }

  getCreditsById(id: number) :Observable<Credits>{
    return this.getAllCredits().pipe(flatMap(result => result), first(creditsAll => creditsAll.id == id));
  }

  get currentToken(){
    return this.movies$;
  }

  clearCache(){
    this.movies$ = null;
    this.creditsAll$ = null;

  }

}
