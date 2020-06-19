import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  @Input() movie: Movie;
  img:string;
  background: string;


  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let id = + this.route.snapshot.params['id'];
    let base = new String("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces");

    this.movieService.getMovieById(id).subscribe(result => {
      this.movie = result; 
      this.img = base.concat(this.movie.backdrop_path.toString());
      // this.background= this.sanitizer.bypassSecurityTrustStyle(`url(${base.concat(this.movie.backdrop_path.toString())}) no-repeat`);
    });

  }

}
