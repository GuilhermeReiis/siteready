import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { SelectionModel } from '@angular/cdk/collections';

import { Aluno } from 'src/app/interface/aluno';
import { Curso } from 'src/app/interface/curso';
import { MatStepper } from '@angular/material/stepper';
import { select } from 'd3-selection';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent implements OnInit {
  alunos: Aluno[] = [];
  cursos: Curso[] = [];

  alunoSelecionado!: any;
  cursosSelecionados: any = [];
  valorTotal = 0;
  

  //Cursos
  selection = new SelectionModel<Curso>(true, []);

  displayedColumns = ['name', 'age', 'email'];
  displayedColumnsCursos = [
    'select',
    'curso',
    'duracao',
    'valor',
    'modalidade',
  ];
  clickedRows = new Set<Aluno>();

  constructor(private taskServices: TaskService) {}

  ngOnInit(): void {
    // Get alunos
    this.taskServices.getAlunos().subscribe((res) => {
      this.alunos = res.aluno;
    });

    //Get Cursos
    this.taskServices.getTasks().subscribe((res) => {
      this.cursos = res.cursos;
    });
  }

  // ALUNO//////////////////////
  selectAluno(teste: MatStepper, row: any) {
    this.alunoSelecionado = row;
    teste.next();
    console.log(row);
    return this.alunoSelecionado;
  }
  selectOneCourse(selection: any, row: any) {
    selection.toggle(row);
    let valorSomado =  Array.from(selection._selection)
    console.log(valorSomado[0]);
    this.valorTotal += row.valor;
  }

  //CURSOS//////////////
  selectCursos(row: any) {
    this.cursosSelecionados = Array.from(row._selection) as any;
    // this.valorTotal += row._selection
    console.log(row);
    console.log(this.cursosSelecionados);
    return this.cursosSelecionados;
  }

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.curso + 1
    }`;
  }

  soma(row: any) {
    this.valorTotal += row.valor;

    console.log(this.valorTotal);
    return this.valorTotal;
  }

  fsad(){
    console.log(22424242)
  }
}
