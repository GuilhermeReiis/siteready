import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { AlterarAlunosComponent } from '../../views/alunos/alterar-aluno/alterar-aluno.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  enabled: boolean;
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
  dataSource = new MatTableDataSource<PeriodicElement>();
  clickedRows = new Set<PeriodicElement>();

  alunos: any = [];


  constructor(
    public dialog: MatDialog,
    private taskServices: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskServices.getAlunos().subscribe((res) => {
      this.dataSource.data = res.aluno;
      console.log(res)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
  alterarAluno(element: any): void {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;

    const dialogRef = this.dialog.open(AlterarAlunosComponent, {
      panelClass: 'teste',
      data: element
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
