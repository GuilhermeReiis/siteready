import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '../interface/vendasInterface';
import { TaskService } from '../services/task.service';

import { MatDialog } from '@angular/material/dialog';
import { DDetalhesComponent } from '../d-detalhes/d-detalhes.component';

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res) => {
      this.dataSource.data = res.cursos;
    });
  }

  displayedColumns: string[] = [
    'select',
    'curso',
    'duracao',
    'valor',
    'detalhe',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new Set<PeriodicElement>();

  ////////////////////////DIAOLOGS////////////////
  openDialog(element: any) {
    this.dialog.open(DDetalhesComponent);
    console.log(element)
    
  }
  /////////////////////////BOTOẼS/////////////////////////

  ////////////////////////FILTRO////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ////////////////////////////////TABLE///////////////////////////////////////

  isSelect(row: any) {
    console.log(this.selection.values());
    return this.selection.has(row);
  }

  select(row: any) {
    return this.selection.add(row);
  }
  unselect(row: any) {
    this.selection.delete(row);
  }
}
