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


 /**
   * Calls the user registration endpoint
   * @function userRegistration
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
 public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(
  catchError(this.handleError)
  );
}

/**
   * Calls the /movies endpoint
   * @function getAllMovies
   * @returns an Observable containing a response
   */
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

/**
   * Calls the /login endpoint
   * @function userLogin
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
 public userLogin(userDetails: any): Observable<any> {
    
    const { UserName, Password } = userDetails;
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

 /**
   * Calls the /movies/:movieTitle endpoint
   * @function getAMovie
   * @param Title the id of the movie to retrieve
   * @returns an Observable containing a response
   */
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

 
  /**
   * Calls the /directors/:directornName endpoint
   * @function getDirector
   * @param Name the name of the actor to retrieve
   * @returns an Observable containig a response
   */

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


  /**
   * Calls the /genres/:genreName endpoint
   * @function getAGenre
   * @param Name the name of the genre to retrieve
   * @returns an Observable conianing a response
   */
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

/**
   * Calls the /users/:username endpoint
   * @function getUser
   * @param username the name of the user to retrieve
   * @returns an Observable conTianing a response
   */
  public getUser(username: any): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
   * Calls the PUT /users/:username/movies/:movieId endpoint
   * @function addToFav
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */

 public addToFav(movieId: any): Observable<any> {
  const username =  localStorage.getItem('user');
  const token = localStorage.getItem('token');
    const response = this.http.post(
      apiUrl + 'users/' + username + '/movies/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));

    
  }

/**
   *  Calls the DELETE /users/:username/movies/:movieId endpoint
   * @function addToFav
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */


  public removeFromFav(movieId: any): Observable<any> {
    const username =  localStorage.getItem('user');
  const token = localStorage.getItem('token');
    const response = this.http.delete(
      apiUrl + 'users/' + username + '/movies/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }


/**
   * Calls the PUT /users/:username
   * @function editUser
   * @param username the user we want to update the info of
   * @param userDetails the new info
   * @returns an Observable containing a response
   */
public editUser(userDetails: any): Observable<any> {
  const username =  localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const response = this.http.put(
    apiUrl + 'users/' + username,
    userDetails,
    headers
  );
  return response.pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
/**
   * Calls the DELETE /users/:username endpoint
   * @function deleteUser
   * @param username the username of the user we want to deregister
   * @returns an Observable containing a response
   */
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
