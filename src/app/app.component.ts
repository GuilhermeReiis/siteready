import { Component, ViewEncapsulation } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'space';
  userId!: string;
  isAdmin = false;
  usuario!: string;

  constructor(
  ) {
    
  }

  ngOnInit(): void {}
}
