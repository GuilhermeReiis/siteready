import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  
  
  constructor(private taskServices: TaskService) {}

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      
      console.log(res.cursos);

    });
  }
}
