import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
export interface PeriodicElement {
  vendedor: string;
  aluno: string;
  idVenda: number;
}

@Component({
  selector: 'app-all-vendas',
  templateUrl: './all-vendas.component.html',
  styleUrls: ['./all-vendas.component.css'],
})
export class AllVendasComponent implements OnInit {
  dataSource = new MatTableDataSource<PeriodicElement>();
  clickedRows = new Set<PeriodicElement>();
  vendas: any = [];
  displayedColumns: string[] = ['vendedor', 'aluno', 'idVenda', 'edit'];
  constructor(
    private taskServices: TaskService,
    public dialog: MatDialog,
    public ngxChartsModule: NgxChartsModule
  ) {}

  ngOnInit(): void {
    this.taskServices.getVendas().subscribe((res) => {
      this.dataSource.data = res.venda;
      console.log(res.venda);
    });
  }

  alterarVenda(element: any): void {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;

    const dialogRef = this.dialog.open(AllVendasComponent, {
      panelClass: 'teste',
      data: {
        _id: id,
      },
    });
  }
  deleteVenda(element: any) {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;

    console.log(id);

    this.taskServices.deleteVenda(id).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
        console.log('venda excluida');
      },
      (err) => {
        console.log(err.error);
      }
    );
  } ////

  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000,
        },
        {
          name: '2011',
          value: 8940000,
        },
      ],
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000,
        },
        {
          name: '2011',
          value: 8270000,
        },
      ],
    },

    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002,
        },
        {
          name: '2011',
          value: 5800000,
        },
      ],
    },
  ];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };
  schemeType: string = 'linear';
}
