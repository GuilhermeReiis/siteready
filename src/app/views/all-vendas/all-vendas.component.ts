import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AlterarVendaComponent } from './alterar-venda/alterar-venda.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { PDFComponent } from 'src/app/pdf/pdf.component';
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
  aluno: any;
  usuario: any;
  clickedRows = new Set<PeriodicElement>();

  displayedColumns: string[] = ['vendedor', 'aluno', 'idVenda', 'PDF', 'edit'];

  showFiller = false;
  showVendas = false;
  showCursos = false;
  showAlunos = false;
  showCadastroVend = false;
  showVendedores = false;
  showAllVendas = true;

  constructor(
    private router: Router,
    private taskServices: TaskService,
    public dialog: MatDialog,
    public ngxChartsModule: NgxChartsModule,
    private authService: AuthService
  ) {}

  openDialog(venda: any) {
    const dialogRef = this.dialog.open(PDFComponent, {
      panelClass: 'teste',
      data: venda,
    });
    

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.taskServices.getVendas().subscribe((res) => {
      this.dataSource.data = res.venda;
      // console.log(res.venda);
    });

    this.taskServices.getAlunos().subscribe((res) => {
      this.aluno = res.aluno;
      // console.log(this.aluno);
    });

    this.taskServices.getAlunos().subscribe((res) => {
      this.usuario = res.usuario;
      // console.log(res.usuario);
    });
  }

  printPDF() {
    console.log('pdf');
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [4, 2],
    });

    doc.text('Hello world!', 1, 1);
    doc.save('two-by-four.pdf');
  }

  changerBuy(vendas: any) {
    this.router.navigate(['/compra'], {
      queryParams: { venda: JSON.stringify(vendas) },
    });
  }

  openAlterarVenda(venda: any): void {
    this.clickedRows.clear();
    this.clickedRows.add(venda);
    const id = this.clickedRows.values().next().value._id;

    // console.log(id)

    const dialogRef = this.dialog.open(AlterarVendaComponent, {
      panelClass: 'teste',
      data: venda,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  deleteVenda(element: any) {
    this.clickedRows.clear();
    this.clickedRows.add(element);
    const id = this.clickedRows.values().next().value._id;
    element.aluno.curso = [];

    this.authService
      .alterarAluno(element.aluno, element.aluno._id)
      .subscribe((res) => {
        console.log(res);
      });

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
  }
}
