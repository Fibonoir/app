import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  isDarkTheme = false;

  get themeClass(): string {
    return this.isDarkTheme ? 'app-dark-theme' : 'app-light-theme';
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
