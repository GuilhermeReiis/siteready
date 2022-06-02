import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import {SelectionModel} from '@angular/cdk/collections';

import {Aluno} from 'src/app/interface/aluno';
import { Curso } from 'src/app/interface/curso';



@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent implements OnInit {
  
  alunos: Aluno[] = [];
  cursos: Curso[] = [];

  //Cursos
  selection = new SelectionModel<Curso>(true, []);


  displayedColumns = ['name','age','email']
  displayedColumnsCursos = ['select','curso','duracao','valor','modalidade']
  clickedRows = new Set<Aluno>();

  constructor(private taskServices: TaskService) {}

  ngOnInit(): void {
    // Get alunos
    this.taskServices.getAlunos().subscribe((res) => {
      this.alunos = res.aluno;
      console.log(res)
    });

    //Get Cursos
    this.taskServices.getTasks().subscribe((res) => {
      this.cursos = res.cursos;
      console.log(res)
    });

    
  }


  //CURSOS//////////////
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.cursos.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.cursos);
  }

  checkboxLabel(row?: Curso): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.curso + 1}`;
  }

}
