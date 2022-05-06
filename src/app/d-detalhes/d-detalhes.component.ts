import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d-detalhes',
  templateUrl: './d-detalhes.component.html',
  styleUrls: ['./d-detalhes.component.css']
})
export class DDetalhesComponent implements OnInit {
  dataSource: any = []
  cursos: any = []
  

  constructor(
    private taskServices: TaskService,
    private router: Router,
    public dialog: MatDialog,
    public element: Element
  ) { }

  ngOnInit(): void {
    
  }

 
}
