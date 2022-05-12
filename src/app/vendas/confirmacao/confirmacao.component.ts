import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/interface/vendasInterface';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css'],
})
export class ConfirmacaoComponent implements OnInit {
  // @Input() data!: { troco: number; curso: string[]; valor: number };
  // @Input() nameAluno!: string;
  listaCurso: string;
  venda: FormGroup;
  isSubmitted = false;
  teste = { message: '', error: false };

  constructor(
    private fBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmacaoComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      aluno: any;
      troco: number;
      curso: any[];
      valor: number;
      vendedor: object;
    }
  ) {
    this.venda = this.fBuilder.group({
      curso: [data.curso],
      aluno: [data.aluno],
      valor: [data.valor],
      troco: [data.troco],
      vendedor: [data.vendedor],
    });

    if (data.curso.length > 1) {
      let cursosString = this.data.curso.map((c) => c.curso);
      this.listaCurso = cursosString.reduce((a, b) => a + ', ' + b);
    } else {
      this.listaCurso = this.data.curso[0].curso;
    }
  }

  ngOnInit(): void {
    console.log(this.data);
    const teste = localStorage.getItem('user');
  }

  send() {
    this.isSubmitted = true;
    console.log(this.venda.value);
    this.taskService.addVenda(this.venda.value).subscribe(
      (res) => {
        console.log(res);
        console.log(this.venda.value);
        this.dialogRef.close(true);
      },
      (err) => {
        this.teste.message = err.error.message;
        this.teste.error = err.error.error;
        console.log(err.error.value);
        console.log(this.venda.value);
      }
    );
  }

  cancelar(): void {
    this.dialogRef.close();
    let carro = 'gol';
  }
}
