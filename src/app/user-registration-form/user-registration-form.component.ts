import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

 //Binds input values to userData object
   
  @Input() userData = { UserName: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
  /**
   * Function for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful registration or an error
   */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  
     this.dialogRef.close(); // This will close the modal on success!
     console.log(result)
     this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
     });
    }, (result) => {
      console.log(result)
      this.snackBar.open('Username already exists. Please try a different username', 'OK', {
        duration: 2000
      });
    });
  }

  }