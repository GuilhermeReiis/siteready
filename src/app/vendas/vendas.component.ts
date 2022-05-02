import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroAlunoComponent } from '../cadastro-aluno/cadastro-aluno.component';
import { PeriodicElement } from '../interface/vendasInterface';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  cursos: any = [];
  clickedRows = new Set<PeriodicElement>();
  panelOpenState = false;

  displayedColumns: string[] = ['curso', 'duracao', 'valor'];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private taskServices: TaskService
  ) {}

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.cursos = res.cursos;
      console.log(res.cursos);
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
    console.log(this.clickedRows)
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
}
