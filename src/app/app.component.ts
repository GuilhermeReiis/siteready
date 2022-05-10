import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { TaskService } from './services/task.service';
import { LocalStorageService } from './local-storage.service';
import { find, observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'space';
  userId!: string;

  constructor(
    
    ){};

  ngOnInit(): void {
   
  }

 
  
  
    
}


