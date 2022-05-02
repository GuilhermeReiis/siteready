import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { CadastroAlunoComponent } from '../cadastro-aluno/cadastro-aluno.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'remove',
  ];
  panelOpenState = false;
  dataSource = TaskService;
  clickedRows = new Set<PeriodicElement>();

  alunos: any = [];


  constructor(
    public dialog: MatDialog,
    private taskServices: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskServices.getAlunos().subscribe((res) => {
      this.alunos = res.aluno;
      console.log(res.aluno);
    });
  }

  addAluno(): void {
    const dialogRef = this.dialog.open(CadastroAlunoComponent, {
      panelClass: 'teste',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
