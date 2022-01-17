import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  /**
   * Called when creating an instance of the class
   * @param router 
   */
  constructor(private router: Router) { }

  /**
   * Initializes the component
   */
  ngOnInit(): void {
  }

  

  /**
   * Route to movie-card/main page
   * @returns navgation to movie-card/main page upon click
   */
  toHome(): void {
    this.router.navigate(['movies'])
  }

  /**
   * Route to profile page
   * @returns navgation to profile page upon click
   */
  toProfile(): void {
    this.router.navigate(['profile'])
  }

  /**
   * Route to welcome page
   * @returns navgation to welcome page upon click
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }
}