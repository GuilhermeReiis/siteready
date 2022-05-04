import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { FormControl } from '@angular/forms';
import { observable, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDividerModule } from '@angular/material/divider';

export interface User {
  name: string;
}
interface Venda {
  status: boolean;
  aluno: string;
  curso: string;
  vendedor: string;
}
@Component({
  selector: 'app-end-venda',
  templateUrl: './end-venda.component.html',
  styleUrls: ['./end-venda.component.css'],
})
export class EndVendaComponent implements OnInit {
  data: any;
  dataSource = TaskService;
  venda: any = [];
  listCourse = [];
  vendedor: any;
  aluno: any = [];
  selectedAluno: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public mat_data: {
      course: any;
    },
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public taskServices: TaskService
  ) {}

  ngOnInit(): void {
    this.taskServices.getVendas().subscribe((res: any) => {
      this.venda = res.venda;
    });

    this.taskServices.getAlunos().subscribe((res) => {
      this.aluno = res.aluno;
      console.log(this.aluno);
    });

    this.listCourse = this.mat_data.course.map((item: any) => item.curso);

    this.vendedor = window.localStorage.getItem('name');
  }

  finalizarVenda() {
    // const newVenda = {
    //   status: true,
    //   aluno: this.selectedAluno,
    //   curso: this.data.course.name,
    //   vendedor: this.vendedor,
    // };
    console.log(this.selectedAluno);
    // console.log(newVenda);
    // this.taskServices.addVenda(newVenda);
  }
}
