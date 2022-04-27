import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  cursos:any = [];
  constructor(private taskServices: TaskService) { }

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.cursos = res.cursos
      console.log(res.cursos);
    });
  }

}
