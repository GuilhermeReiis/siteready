import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlterarCursosComponent } from '../alterar-cursos/alterar-cursos.component';
import { CadastroCursosComponent } from '../cadastro-cursos/cadastro-cursos.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  panelOpenState = false;


  constructor() { }

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.alunos = res.alunos;
    });
  }
}
