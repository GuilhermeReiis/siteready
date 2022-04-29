import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroAlunoComponent } from '../cadastro-aluno/cadastro-aluno.component';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  cursos:any = [];
  clickedRows = new Set();
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private taskServices: TaskService) { }

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.cursos = res.cursos
      console.log(res.cursos);
    });
  }

  addAluno(){
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
