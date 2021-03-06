import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 


@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {
   /**
   * Called when creating an instance of the class
   * @param data {object}
   */
  
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: { name: string, bio: string, birth: string, death: string }
    ) { }

  ngOnInit(): void {
  }

}
