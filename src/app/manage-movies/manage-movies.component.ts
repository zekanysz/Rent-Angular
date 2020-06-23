import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.css']
})
export class ManageMoviesComponent implements OnInit {
  addMovieForm: FormGroup;

  constructor(private fb: FormBuilder, private movieService: MovieService) { }

  ngOnInit(): void {
    this.addMovieForm = this.fb.group({
      title: [''],
    });
  }

  addMovie(){
    this.movieService.addMovie(this.addMovieForm.value.title).subscribe(response => {
      console.log(response);
    });
    this.addMovieForm.reset();
  }
}
