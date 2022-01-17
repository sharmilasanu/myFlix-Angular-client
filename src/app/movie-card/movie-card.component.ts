// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];
  favourites: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    )
     { }
    

ngOnInit(): void {
  this.getMovies();
  this.getFavouriteMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '250px' 
    });
  } 
// Opens a dialog to display the director component, passing it the data it needs within the data object
  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '250px' 
    });
  }
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { title: title, description: description },
      width: '250px' 
    });
  }
  getFavouriteMovies(): any {
    const username = localStorage.getItem('user');
   
    this.fetchApiData.getUser(username).subscribe((res: any) => {
      console.log(res)
      this.favourites = res.FavoriteMovies;
      console.log(this.favourites)
      return this.favourites;
    });
    
  }


// Adds the selected movie to the user's favourites
addMovieToFavourites(movieId: string): void {
  this.fetchApiData.addToFav(movieId).subscribe((resp: any) => {
    console.log(resp);
    this.snackBar.open(`Successfully added to your favorites list`, 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
    
  });
  return this.getFavouriteMovies();
 
}
// Deletes the selected movie from the user's favourites
removeFavMovie(movieId: string): void {
  this.fetchApiData.removeFromFav(movieId).subscribe((resp: any) => {
    console.log(resp);
    this.snackBar.open(`Successfully removed from your favorites list`, 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
  return this.getFavouriteMovies();
}
inFavorited(movieId: string): boolean {
  if (this.favourites.includes(movieId)) {
    return true;
  } else {
    return false;
  }
}
}