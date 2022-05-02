import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { CadastroAlunoComponent } from '../cadastro-aluno/cadastro-aluno.component';
import { AlterarAlunosComponent } from '../alterar-alunos/alterar-alunos.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  tell: number;
}

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'weight',
    'symbol',
    'tell',
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

 
  alterarAluno(element: any): void {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;

    const dialogRef = this.dialog.open(AlterarAlunosComponent, {
      panelClass: 'teste',
      data:{
        _id:id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      
      console.log('fechado',result);
      this.ngOnInit();
      
    });
  }

  addAluno(): void {
    const dialogRef = this.dialog.open(CadastroAlunoComponent, {
      panelClass: 'teste',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  deleteAlunos(element: any) {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;

    console.log(id)

    this.taskServices.deleteAlunos(id).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
       
      },
      (err) => {
        console.log(err.error)

      }
    );
  }

}
