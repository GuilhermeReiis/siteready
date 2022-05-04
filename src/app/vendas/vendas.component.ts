import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroAlunoComponent } from '../cadastro-aluno/cadastro-aluno.component';
import { PeriodicElement } from '../interface/vendasInterface';
import { LocalStorageService } from '../local-storage.service';
import { __values } from 'tslib';
import { EndVendaComponent } from '../end-venda/end-venda.component';
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
  clickedRows = new Set<any>();
  panelOpenState = false;

  teste = { message: '', error: false };
  curso = new FormControl();
  isSubmitted = false;

  dataSource = new MatTableDataSource<PeriodicElement>();

  displayedColumns: string[] = ['curso', 'duracao', 'valor'];
  aluno: any;
  authService: any;
  test: any = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private taskServices: TaskService
  ) {}

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.dataSource.data = res.cursos;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  vender() {
    const curso = this.clickedRows;
    // localStorage.setItem(this.curso)
    this.router.navigate(['endVenda'], {
      queryParams: {
        //sua venda
        client: {},
        courses: this.clickedRows,
        user_logued: {},
      },
    });
  }

  addAndRemoveClassRow(row: any, add = true) {
    if (add) {
      row.enabled = true;
      this.clickedRows.add(row);
    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
    }

    this.test = [];
    for (let clickedRow of this.clickedRows) {
      this.test.push(clickedRow);
    }

    localStorage.setItem('curso', JSON.stringify(this.test));
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

  openModalVenda() {
    const dialogRef = this.dialog.open(EndVendaComponent, {
      data: {
        course: this.test,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      
    });
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
}
