import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  clickedRows = new Set<PeriodicElement>();
  dataSource = new MatTableDataSource<PeriodicElement>();
  cursos: any = [];

  constructor(
    public dialog: MatDialog,
    private taskServices: TaskService,
    private router: Router
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

  closeDialog() {
    this.dialog.closeAll();
    this.ngOnInit();
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
      this.ngOnInit();
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
      this.ngOnInit();
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
        this.ngOnInit();
       
      },
      (err) => {
        console.log(err.error)

      }
    );
  }



  
}
