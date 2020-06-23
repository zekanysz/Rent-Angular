import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { Credits } from 'src/app/interfaces/credits';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { PersonImages } from 'src/app/interfaces/person-images';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  @Input() movie: Movie;
  @Input() credits: Credits;
  @Input() personImagesAll: Array<PersonImages>;


  posterImgUrl: string
  backImgUrl: string;
  hour: number;
  minute: number;
  background: string;


  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let id = + this.route.snapshot.params['id'];
    let backBase = new String("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces");
    let posterBase = new String("https://image.tmdb.org/t/p/w342");
    let personImageBase = new String("https://image.tmdb.org/t/p/w185");

    this.movieService.getMovieById(id).subscribe(result => {
      this.movie = result;
      this.getTimeDifference(this.movie.runtime);
      this.backImgUrl = backBase.concat(this.movie.backdrop_path.toString());
      this.posterImgUrl = posterBase.concat(this.movie.poster_path.toString());
    });

    this.movieService.getCreditsById(id).subscribe(result => {
      this.credits = result;
    });

    this.movieService.getAllPersonImagesByMovieId(id).subscribe(result => {
      this.personImagesAll = result;
    });

  }

  getTimeDifference(timestampDifference) {
    let temp = timestampDifference * 60;
    const hours = Math.floor((temp / 3600));
    this.hour = hours;
    const minutes = timestampDifference - hours * 60;;
    this.minute = minutes
  }

}
