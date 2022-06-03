import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { SelectionModel } from '@angular/cdk/collections';

import { Aluno } from 'src/app/interface/aluno';
import { Curso } from 'src/app/interface/curso';
import { MatStepper } from '@angular/material/stepper';
import { select } from 'd3-selection';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Venda } from 'src/app/interface/venda';

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
  valorPago = 0;
  troco = 0;
  venda!: FormGroup;

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

  constructor(private taskServices: TaskService,
    private fb: FormBuilder
    ) {
    this.venda = this.fb.group({
      curso: [],
      aluno: [],
      valor: [],
      troco: [''],
      vendedor: [''],
    });
  }
  
  ngOnInit(): void {
    // Get alunos
    this.taskServices.getAlunos().subscribe((res) => {
      this.alunos = res.aluno;
    });

    //Get Cursos
    this.taskServices.getTasks().subscribe((res) => {
      this.cursos = res.cursos;
    });

    // Formulario de envio da venda
    this.venda = this.fb.group({
      curso: [this.cursosSelecionados],
      aluno: [this.alunoSelecionado],
      valor: [this.valorTotal],
      troco: [''],
      vendedor: [''],
    });
  }

  // ALUNO//////////////////////
  selectAluno(teste: MatStepper, row: any) {
    this.alunoSelecionado = row;
    this.venda.get('aluno')?.setValue(row);
    console.log(this.venda.get('aluno')?.value)
    teste.next();

    return this.alunoSelecionado;
  }
  selectOneCourse(selection: any, row: any) {
    selection.toggle(row);

    
    const initialValue = 0;
    let courseSelecteds = Array.from(selection._selection);
    
    this.venda.get('curso')?.setValue(courseSelecteds);
    console.log(this.venda.get('curso')?.value)
    this.valorTotal = courseSelecteds.reduce(
      (previousValue: any, currentValue: any) =>
        previousValue + currentValue.valor,
      initialValue
    ) as any;
    console.log(this.valorTotal)
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

  somaTroco() {
    console.log(this.valorTotal);
    this.troco = -(this.valorTotal - this.valorPago);
  }

}
