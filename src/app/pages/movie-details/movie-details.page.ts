import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any = {}
  imageUrl = environment.images

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(id);
    this.movieService.getMovieDetails(id).subscribe(data => {
      console.log(data);
      this.movie = data
    })
  }

  openHomepage() {
    window.open(this.movie.homepage)
  }
}
