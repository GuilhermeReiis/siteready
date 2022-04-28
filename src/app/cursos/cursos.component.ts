import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlterarCursosComponent } from '../alterar-cursos/alterar-cursos.component';
import { CadastroCursosComponent } from '../cadastro-cursos/cadastro-cursos.component';
import { TaskService } from '../services/task.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'remove',
  ];
  dataSource = TaskService;
  clickedRows = new Set<PeriodicElement>();

  cursos: any = [];

  constructor(
    public dialog: MatDialog,
    private taskServices: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.cursos = res.cursos;
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openModal() {
    this.router.navigate(['Cadastro_Curso']);
    this.router.navigate([this.alterarCurso])
  }

  addCurso(): void {
    const dialogRef = this.dialog.open(CadastroCursosComponent, {
      panelClass: 'teste',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  alterarCurso(element: any): void {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;

    console.log(id)

    const dialogRef = this.dialog.open(AlterarCursosComponent, {
      panelClass: 'teste',
      data:{
        _id:id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  deleteCurso(element: any) {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;

    console.log(id)

    this.taskServices.deleteProject(id).subscribe(
      (res) => {
        console.log(res);
       
      },
      (err) => {
        console.log(err.error)

      }
    );
  }



  
}
