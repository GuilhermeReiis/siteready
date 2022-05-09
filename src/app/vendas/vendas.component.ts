import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroAlunoComponent } from '../cadastro-aluno/cadastro-aluno.component';
import { PeriodicElement } from '../interface/vendasInterface';
import { LocalStorageService } from '../local-storage.service';
import { __values } from 'tslib';

///////////////////////////////////////////////

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  form!: FormGroup;
  clickedRows = new Set<any>();
  panelOpenState = false;
  hide = true;
  teste = { message: '', error: false };
  curso = new FormControl();
  isSubmitted = false;

  dataSource = new MatTableDataSource<PeriodicElement>();

  displayedColumns: string[] = ['curso', 'duracao', 'valor'];
  aluno: any;
  authService: any;
  test: any = [];

  students: any = [];

  isStudentExist = false;
  ///////filtro alunos///
  ///////filtro alunos///
  myControl = new FormControl();
  options!: string[];
  filteredOptions!: Observable<string[]>;




  constructor(
    private router: Router,
    public dialog: MatDialog,
    private taskServices: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      paidValue: [0],
      troco: [0],
      total:[0]
    });
  }

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.dataSource.data = res.cursos;
    });
    //////////filtro de alunos//////

    this.taskServices.getAlunos().subscribe((res) => {
      this.students = res.aluno;

      this.options = this.students.map((alu: any) => alu.name);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
      // console.log(test)
    });
  }
  ////////////////fltto de aluno////////////
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  //////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkStudent(event: string) {
    const index = this.students.findIndex(
      (student: any) => student.name.toLowerCase() == event.toLocaleLowerCase()
    );

    if (index === -1) {
      this.isStudentExist = false;
    } else {
      this.isStudentExist = true;
    }
    console.log(this.isStudentExist);
  }

  vender() {
    const curso = this.clickedRows;
    const vendedor = localStorage.getItem('name');
    const aluno = this.myControl.value;

   
    // console.log(aluno);
    // console.log(curso);
    // console.log(vendedor);
  }

  addAndRemoveClassRow(row: any, add = true) {
    if (add) {
      row.enabled = true;
      this.clickedRows.add(row);

    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
    }

    const getvalor = Array.from(this.clickedRows).reduce(
      (acc: number, value: any) => {
        return acc + value.valor;
      },
      0
    );
    this.form.patchValue({
      total: getvalor,
      paidValue: getvalor
    });
    
    console.log(this.form)
    this.form.patchValue({  
      total: getvalor,
      paidValue: getvalor,
      troco: this.form.get('paidvalue')!.value - this.form.get('total')!.value,
    });
    troco: this.form.get('paidvalue')!.value  - this.form.get('total')!.value,
    console.log(this.form)
  }

  calculoTroco(total: number, paidValue: number ){
    let troco = total - paidValue;
    console.log(troco)
    return troco;
    
  }

  addAluno() {
    const dialogRef = this.dialog.open(CadastroAlunoComponent, {
      panelClass: 'teste',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openModal() {
    this.router.navigate(['cadastra_Aluno']);
    this.router.navigate([this.cadastraAluno]);
  }

  cadastraAluno(element: any): void {
    this.clickedRows.clear();
    this.clickedRows.add(element);

    const dialogRef = this.dialog.open(CadastroAlunoComponent, {
      panelClass: 'teste',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  send() {
    this.isSubmitted = true;

    const curso = this.aluno.value.curso.value.map((item: any) => item.curso);
    this.aluno.value.curso = curso;

    console.log(this.aluno.value, curso);
    this.authService.addAluno(this.aluno.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
      },
      (err: any) => {
        this.teste.message = err.error.message;
        this.teste.error = err.error.error;
        console.log(err.error);
      }
    );
    this.ngOnInit();
  }

  soma() {
    let valor = this.curso;

    console.log(valor);
  }
}
