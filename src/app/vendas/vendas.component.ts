import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroAlunoComponent } from '../cadastro-aluno/cadastro-aluno.component';
import { PeriodicElement } from '../interface/vendasInterface';

import { __values } from 'tslib';

///////////////////////////////////////////////

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';

import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  selectedCourses: PeriodicElement[] = [];
  form!: FormGroup;
  clickedRows = new Set<PeriodicElement>();
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
  allCourses = [];
  myControl = new FormControl();
  options!: string[];
  filteredOptions!: Observable<string[]>;

  subtotal: number = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private taskServices: TaskService
  ) {
    this.form = new FormGroup({
      paidValue: new FormControl({ value: 0 }),
      troco: new FormControl({ value: 0, disabled: true }),
    });
  }

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.allCourses = res.cursos
      this.dataSource.data = this.allCourses;
    });
    //////////filtro de alunos//////

    this.taskServices.getAlunos().subscribe((res) => {
      this.students = res.aluno;

      this.options = this.students.map((alu: any) => alu.name);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
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

  checkStudent(student: any) {
    this.aluno = student;
    const filterTable = this.allCourses.filter((course: any) => {
      return !student.curso.includes(course._id);
    });

    this.dataSource.data = filterTable;

    
    const index = this.students.findIndex(
      (student: any) =>
        student.name.toLowerCase() == student.name.toLocaleLowerCase()
    );
    if (index === -1) {
      this.isStudentExist = false;
    } else {
      this.isStudentExist = true;
    }
  }

  vender() {
    const curso = this.clickedRows;
    const vendedor = localStorage.getItem('user');
    const aluno = this.myControl.value;
  }

  addAndRemoveClassRow(row: PeriodicElement, add = true) {
    if (add) {
      row.enabled = true;
      this.clickedRows.add(row);
    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
    }

    this.selectedCourses = [...this.clickedRows];

    let valores = this.selectedCourses.map((course: any) => {
      return course.valor;
    });

    // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;

    this.subtotal = valores.reduce((a: any, b: any) => a + b);

    this.form.patchValue({
      troco: 0,
      total: this.subtotal,
      paidValue: this.subtotal,
    });
  }

  calculoTroco() {
    let paidValue = this.form.get('paidValue')?.value as number;
    let troco = paidValue - this.subtotal;
    this.form.patchValue({
      troco: troco,
    });
  }

  addAluno() {
    const dialogRef = this.dialog.open(CadastroAlunoComponent, {
      panelClass: 'teste',
    });

    dialogRef.afterClosed().subscribe((result) => {});
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

    dialogRef.afterClosed().subscribe((result) => {});
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

  openDialog() {
    let vendedor = JSON.parse(localStorage.getItem('user')!);
    // console.log(vendedor.user)
    // return
    // console.log({
    //   aluno: this.aluno,
    //   curso: this.selectedCourses,
    //   vendedor: vendedor.user,
    //   valor: this.form.get('paidValue')?.value,
    //   troco: this.form.get('troco')?.value,
    // });
    // return;
    this.dialog
      .open(ConfirmacaoComponent, {
        data: {
          aluno: this.aluno,
          curso: this.selectedCourses,
          vendedor: vendedor.user,
          valor: this.form.get('paidValue')?.value,
          troco: this.form.get('troco')?.value,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) console.log('venda finalizada');
      });
  }
}
