import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl =  'https://sharmismyflix.herokuapp.com/';
const token = localStorage.getItem('token');
const headers = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + token,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }



// Non-typed response extraction
private extractResponseData(res: any): any {
  const body = res;
  return body || { };
}


 // Api call for the user registration endpoint
 public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(
  catchError(this.handleError)
  );
}


//get all movies
public getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


// Api call for User login 
 public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const { UserName, Password } = userDetails;
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  //Gets data of movie by name/title
  public getAMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //gets a director by name
  public getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //gets genre by name
  public getAGenre(): Observable<any> {
    return this.http.get(apiUrl + 'genre/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // gets user by name
  public getUser(username: any): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //adds a favorite movie

 public addToFav(username: string, MovieID: string): Observable<any> {
    const response = this.http.post(
      apiUrl + 'users/' + username + 'movies/' + MovieID,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }


  //deletes a favorite movie

  public removeFromFav(username: string, MovieID: string): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + 'movies/' + MovieID,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }



// updates a user
public editUser(username: string, updatedInfo: object): Observable<any> {
  const response = this.http.put(
    apiUrl + 'users/' + username,
    updatedInfo,
    headers
  );
  return response.pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//deletes a user
public deleteUser(username: string): Observable<any> {
  const response = this.http.delete(
    apiUrl + 'users/' + username ,
    headers
  );
  return response.pipe(catchError(this.handleError));
}


private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
