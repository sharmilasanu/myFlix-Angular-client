import { Component, OnInit,Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  // empty states that gets populated in functions
  user: any = {};
  favMovies: any = {};

  //Binds input values to userData object  /**
   @Input() userData = { UserName: '', Password: '', Email: '', Birthday: '' }

  /**
   * Called when creating an instance of the class
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   * @param router 
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }


  /**
   * Get user info of the logged in user
   * @returns the user state which includes the info of the logged in user
   */

  getUserInfo(): void {
    const user = localStorage.getItem('user')
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp
      return this.user
    })
  }


  /**
   * Retrieves the logged in user's favorited movies
   * @returns filterFavorites() function which filters the favorited movies
   */
  getFavMovies(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favMovies.push(movie);
        }
      });
    });
    return this.favMovies;
  }

 /**
  * Updates info of the logged in user
  * @returns alert indicating a successful update or an error
  */
 editUserInfo(): void {
    const updatedData = {
      UserName: this.userData.UserName ? this.userData.UserName : this.user.UserName,
      Password: this.userData.Password ? this.userData.Password : this.user.Password,
      Email: this.userData.Email ? this.userData.Email : this.user.Email,
      Birthday: this.userData.Birthday ? this.userData.Birthday : this.user.Birthday,
    }
    console.log(updatedData);
    this.fetchApiData.editUser(updatedData).subscribe((resp: any) => {
      console.log(resp)
      this.snackBar.open("You have updated your profile", "OK", {
        duration: 4000
      });
      this.ngOnInit()
      localStorage.setItem('user', resp.UserName)
      this.getUserInfo()
    }, (resp: any) => {
      console.log(resp)
      this.snackBar.open("Something went wrong, please try again", "OK", {
        duration: 4000
      });
    })
    
  }
  
}