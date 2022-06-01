import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

export interface PeriodicElement {
  name: string;
}



@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent implements OnInit {
  panelOpenState = false;
  alunos: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  clickedRows = new Set<PeriodicElement>();

  constructor(private taskServices: TaskService) {}

  ngOnInit() {
    this.taskServices.getAlunos().subscribe((res) => {
      this.alunos = res.aluno;
      for (let aluno of this.alunos) {
        console.log(aluno);
      }
    });
  }
}
