import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {


  // @ViewChild('template') modal : TemplateRef<any>;
  modalRef: BsModalRef;

  movies: Movie[] = []; 
  movies$ : Observable<Movie[]>;

  selectedMovie: Movie;
  movie: Movie;
  movie$: Observable<Movie>;

  constructor(private movieService: MovieService, private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {

    this.movies$ = this.movieService.getMovies();

    this.movies$.subscribe(result => {
      this.movies = result;
    });
  }

  getMovies(){
    this.movies$ = this.movieService.getMovies();

    this.movies$.subscribe(result => {
      this.movies = result;
    });
  }

  select(movie: Movie){
    this.selectedMovie = movie;
    this.router.navigateByUrl("/Movies/" + movie.id);
  }

}
