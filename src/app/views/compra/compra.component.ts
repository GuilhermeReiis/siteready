import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { SelectionModel } from '@angular/cdk/collections';

import { Aluno } from 'src/app/interface/aluno';
import { Curso } from 'src/app/interface/curso';
import { MatStepper } from '@angular/material/stepper';
import { select } from 'd3-selection';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Venda } from 'src/app/interface/venda';
import { LocalStorageService } from 'src/app/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent implements OnInit {
  alunos: Aluno[] = [];
  cursos: Curso[] = [];

  alunoSelecionado!: any;
  cursosSelecionados: any = false;
  valorTotal = 0;
  valorPago = 0;
  troco = 0;
  venda: FormGroup;
  isSubmitted = false;

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

  constructor(
    private taskServices: TaskService,
    private fBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.venda = this.fBuilder.group({
      curso: [''],
      aluno: [''],
      valor: [null],
      valorPg: [null],
      troco: [null],
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

    //Get Vendedor
    this.venda.patchValue({
      vendedor: JSON.parse(window.localStorage.getItem('user')!)?.user,
    });
    console.log(this.venda);

    // Formulario de envio da venda
    // this.venda = this.fb.group({
    //   curso: [this.cursosSelecionados],
    //   aluno: [this.alunoSelecionado],
    //   valor: [this.valorTotal],
    //   valorPago:[''],
    //   troco: [''],
    //   vendedor: [''],
    // });
  }

  // ALUNO//////////////////////
  selectAluno(teste: MatStepper, row: any) {
    this.alunoSelecionado = row;
    this.venda.get('aluno')?.setValue(row);
    teste.next();
    this.venda.patchValue({
      aluno: this.alunoSelecionado,
    });

    return this.alunoSelecionado;
  }
  selectOneCourse(selection: any, row: any) {
    selection.toggle(row);

    const initialValue = 0;
    let courseSelecteds = Array.from(selection._selection);

    this.venda.get('curso')?.setValue(courseSelecteds);

    this.valorTotal = courseSelecteds.reduce(
      (previousValue: any, currentValue: any) =>
        previousValue + currentValue.valor,
      initialValue
    ) as any;

    this.venda.patchValue({
      curso: courseSelecteds,
      valor: this.valorTotal,
    });
  }

  //CURSOS//////////////
  selectCursos(row: any) {
    this.cursosSelecionados = Array.from(row._selection) as any;
    // this.valorTotal += row._selection
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
    this.venda.patchValue({
      troco: this.venda.value.valorPg - this.valorTotal,
    });
  }

  sendSell() {
    this.isSubmitted = true;

    this.taskServices.addVenda(this.venda.value).subscribe(
      (res) => {
        this._snackBar.open('Venda finalizada com sucesso!!', 'Fechar', {
          duration: 2000,
        });
        console.log(res);
      },
      (err) => {
        this._snackBar.open('Erro ao finalizar venda!', 'Fechar', {
          duration: 2000,
        });
      }
    );
  }

  disable() {
    if (
      !parseFloat(this.venda.get('valorPg')?.value!) ||
      !parseFloat(this.valorTotal.toString())
    ) {
      return true;
    }
    return !(
      parseFloat(this.venda.get('valorPg')?.value!) >=
      parseFloat(this.valorTotal.toString())
    );
  }
}
