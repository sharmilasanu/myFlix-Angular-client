import { Component, OnInit, Input} from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginCredentials = { UserName: '', Password: '' };
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginCredentials).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)

  
     this.dialogRef.close(); // This will close the modal on success!
     localStorage.setItem('token', result.token);
     localStorage.setItem('user', JSON.stringify(result.user));
     console.log(result)
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
