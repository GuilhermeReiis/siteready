import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/interface/vendasInterface';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

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
  
  teste = { message: '', error: false };

  constructor(
    private fBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmacaoComponent>,
    private taskService: TaskService,
    private authService: AuthService,
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
    // this.alunos = data.aluno.group({
    //   name: [data.name,],
    //   age: [data.age, ],
    //   email: [data.email,],
    //   tell: [data.tell, ],
    // });

    if (data.curso.length > 1) {
      let cursosString = this.data.curso.map((c) => c.curso);
      this.listaCurso = cursosString.reduce((a, b) => a + ', ' + b);
    } else {
      this.listaCurso = this.data.curso[0].curso;
    }
  }

  ngOnInit(): void {
    const sad = this.data;
    const teste = localStorage.getItem('user');
    console.log(sad)
  }

  send() {
    
    const cursoSelected = this.data.curso.map((res: any) => {
      return res._id;
    });

    const arrayCurso = cursoSelected.concat(this.data.aluno.curso);
    console.log(arrayCurso);
    this.venda.value.aluno.curso = arrayCurso;

    // this.authService
    //   .alterarAluno(this.venda.value.aluno, this.venda.value.aluno._id)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    // this.authService.alterarAluno(cursoSelected, this.data.aluno.curso)
    console.log(this.venda.value.aluno);
    this.taskService.addVenda(this.venda.value).subscribe({
      next: (res) => {
        this.dialogRef.close({data: 'send'});
      },
      error: (err) => {
        this.teste.message = err.error.message;
        this.teste.error = err.error.error;
        console.log(err.error.value);
        console.log(this.venda.value);
      },
    });
  }

  cancelar(): void {
    console.log('o')
    this.dialogRef.close({data: 'closed'});
    
    let carro = 'gol';
  }
}
