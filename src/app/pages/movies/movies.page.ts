import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageUrl = env.images;

  constructor(
    private movieService: MovieService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies().subscribe((data) => {
      loading.dismiss();
      this.movies.push(...data.results);
      console.log(data.results);

      event?.target.complete();
      if (event) {
        event.target.disabled = data.total_pages === this.currentPage
      }
    });

  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
