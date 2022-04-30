import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  panelOpenState = false;
  dataSource = TaskService;


  alunos: any = [];


  constructor(
    public dialog: MatDialog,
    private taskServices: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((res) => {
      this.alunos = res.alunos;
    });
  }
}
