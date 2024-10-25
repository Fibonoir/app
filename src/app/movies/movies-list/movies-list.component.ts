import { Component, OnInit } from '@angular/core';
import { iMovie } from '../../interfaces/movies/movie';
import { MoviesService } from '../../services/movies.service';
import { AuthService } from '../../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { NotificationService } from '../../services/notification.service';
import { iFavorite } from '../../interfaces/movies/favourties';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies: iMovie[] = [];
  userId: string | null = null;
  favoriteMovies: iFavorite[] = [];

  constructor(
    private moviesService: MoviesService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUser()?.id || null;
    console.log(this.userId);

    if (this.userId) {
      this.loadMoviesAndFavorites(this.userId);
    }
  }

  private loadMoviesAndFavorites(userId: string): void {
    this.moviesService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.moviesService.getFavorites(userId).subscribe((favorites) => {
        this.favoriteMovies = favorites;
        console.log(favorites);

      });
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.some((fav) => fav.movie.id === movieId);
  }

  toggleFavorite(movie: iMovie): void {
    if (this.userId) {
      if (this.isFavorite(movie.id)) {
        this.removeFromFavorites(movie.id);
      } else {
        this.addToFavorites(movie);
      }
    }
  }

  private addToFavorites(movie: iMovie): void {
    if (this.userId) {
      const favorite: iFavorite = {
        id: uuidv4(),
        userId: this.userId,
        movie: movie
      };
      this.moviesService.addFavorite(favorite).subscribe(() => {
        this.favoriteMovies.push(favorite);
        this.notificationService.showSuccess('Added to favorites!');
      });
    }
  }

  private removeFromFavorites(movieId: string): void {
    if (this.userId) {
      const favorite = this.favoriteMovies.find((fav) => fav.movie.id === movieId);
      if (favorite) {
        this.moviesService.removeFavorite(favorite.id).subscribe(() => {
          this.favoriteMovies = this.favoriteMovies.filter((fav) => fav.id !== favorite.id);
          this.notificationService.showSuccess('Removed from favorites.');
        });
      }
    }
  }
}
