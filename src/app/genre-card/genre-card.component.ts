import { Component, OnInit ,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {
/**
   * Called when creating an instance of the class
   * @param data {object}
   */
  constructor(
    //Injection token that can be used to access the data that was passed in to a dialog.
    @Inject(MAT_DIALOG_DATA) 
    public data: { name: string, description: string }
    ) {}

  ngOnInit(): void {
  }

}
