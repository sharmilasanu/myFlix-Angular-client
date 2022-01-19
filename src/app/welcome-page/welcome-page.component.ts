import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  // Initializes  the component
  ngOnInit(): void {
  }

  // function that will open the dialog when the register button is clicked
  /**
   * Function for opening registration form to create a new user
   * @returns opens the form for users to input their data
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px'
    });
  }
  // function that will open the dialog when the sign in button is clicked
  /**
   * Function for opening login form to sign in as a returning user
   * @returns opens the form for users to input their data
   */
  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '350px'
    });
  }
}
