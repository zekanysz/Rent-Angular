import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { Credits } from '../interfaces/credits';
import { shareReplay, flatMap, first } from 'rxjs/operators';
import { PersonImages } from '../interfaces/person-images';
import { PersonDetails } from '../interfaces/person-details';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private addMoviePathUrl = environment.apiUrl + '/Movie/Add/';
  private getAllMoviesUrl = environment.apiUrl + '/Movie/AllMovies';
  private getAllCreditsUrl = environment.apiUrl + '/Movie/AllCredits';
  private getAllPersonImagesUrl = environment.apiUrl + '/Movie/AllPersonImagesByMovieId';
  private getAllPersonDetailsUrl = environment.apiUrl + '/Movie/AllPersonDetailsByMovieId';



  private movies$: Observable<Movie[]>;
  private movie$: Observable<Movie>;

  private creditsAll$: Observable<Credits[]>;
  private credits$: Observable<Credits>;

  private personeImagesAll$: Observable<PersonImages[]>;
  private personDetailsAll$: Observable<PersonDetails[]>;



  constructor(private http: HttpClient) { }

  // Admin
  addMovie(imdbId){
    return  this.http.post(this.addMoviePathUrl + imdbId, null);
  }

  // User
  getMovies() : Observable<Movie[]>{
      this.movies$ = this.http.get<Movie[]>(this.getAllMoviesUrl).pipe(shareReplay());
    return this.movies$;
  }

  getMovieById(id :number) : Observable<Movie>{
    return this.getMovies().pipe(flatMap(result => result), first(movie => movie.id == id));
  }


  getAllCredits() : Observable<Credits[]>{
    if(!this.creditsAll$){
      this.creditsAll$ = this.http.get<Credits[]>(this.getAllCreditsUrl).pipe(shareReplay());
    }
    return this.creditsAll$;
  }

  getCreditsById(id: number) :Observable<Credits>{
    return this.getAllCredits().pipe(flatMap(result => result), first(creditsAll => creditsAll.id == id));
  }

  getAllPersonImagesByMovieId(movieId: number) : Observable<PersonImages[]>{
      this.personeImagesAll$ = this.http.get<PersonImages[]>(this.getAllPersonImagesUrl+"/"+ movieId).pipe(shareReplay());
    return this.personeImagesAll$;
  }

  getAllPersonDetailsByMovieId(movieId: number) : Observable<PersonDetails[]>{
    this.personDetailsAll$ = this.http.get<PersonDetails[]>(this.getAllPersonDetailsUrl+"/"+ movieId).pipe(shareReplay());
  return this.personDetailsAll$;
}

  get currentToken(){
    return this.movies$;
  }

  clearCache(){
    this.movies$ = null;
    this.creditsAll$ = null;

  }

}
