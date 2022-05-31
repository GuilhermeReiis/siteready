import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { emailMask } from 'text-mask-addons';

import { AlterarUserComponent } from '../usuarios/alterar-user/alterar-user.component';
import { TaskService } from '../../services/task.service';


export interface PeriodicElement {
  nome: string;
  cpf: number;
  email: string;
  tell: number;
  adm: boolean;
}

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {
  emailMask = emailMask;
  displayedColumns: string[] = [
    'nome',
    'cpf',
    'email',
    'tell',
    'adm',
    'edit'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();
  clickedRows = new Set<PeriodicElement>();
  constructor(
    private taskServices: TaskService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.taskServices.searchUser().subscribe((res) => {
      this.dataSource.data = res.user;
      console.log(this.dataSource.data)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(element: any) {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;

    console.log(id)

    this.taskServices.deleteUser(id).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
       
      },
      (err) => {
        console.log(err.error)

      }
    );
  }

  alterarUser(user: any): void{
    this.clickedRows.clear();
    this.clickedRows.add(user);
    
    const id = this.clickedRows.values().next().value._id;



    const dialogRef = this.dialog.open(AlterarUserComponent, {
      panelClass: 'teste',
      data:user
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    })
  }
  
}
