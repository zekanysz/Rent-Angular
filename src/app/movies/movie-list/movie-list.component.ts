import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {


  @ViewChild('template') modal : TemplateRef<any>;
  modalRef: BsModalRef;

  movies: Movie[] = []; 
  movies$ : Observable<Movie[]>;

  movie: Movie;
  movie$: Observable<Movie>;

  constructor(private movieService: MovieService, private modalService: BsModalService) { }

  ngOnInit(): void {

    this.movies$ = this.movieService.getMovies();

    this.movies$.subscribe(result => {
      this.movies = result;
      console.log(this.movies);
    });
  }

  getMovies(){
    this.movieService.getMovies();
  }

  view(id){
    this.modalRef = this.modalService.show(this.modal);
    this.movie$ = this.movieService.getMovieByImdbId(id);
    this.movie$.subscribe(result => {
      this.movie = result;
    });

  }
}
