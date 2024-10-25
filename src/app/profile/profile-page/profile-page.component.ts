import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { MoviesService } from '../../services/movies.service';
import { iUser } from '../../interfaces/user';
import { iFavorite } from '../../interfaces/movies/favourties';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: iUser | null = null;
  favoriteMovies: iFavorite[] = [];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUser()?.id;
    if (userId) {
      this.usersService.getUser(userId).subscribe((user) => {
        this.user = user;
        this.loadFavoriteMovies(userId);
        console.log(this.favoriteMovies);

      });
    }
  }

  private loadFavoriteMovies(userId: string): void {
    this.moviesService.getFavorites(userId).subscribe((favorites) => {
      this.favoriteMovies = favorites;
    });
  }
}
