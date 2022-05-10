import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/interface/vendasInterface';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css'],
})
export class ConfirmacaoComponent implements OnInit {
  // @Input() data!: { troco: number; curso: string[]; valor: number };
  // @Input() nameAluno!: string;
  listaCurso: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      nomeAluno: string;
      troco: number;
      curso: PeriodicElement[];
      valor: number;
    }
  ) {
    if (data.curso.length > 1) {
      let cursosString = this.data.curso.map((c) => c.curso);
      this.listaCurso = cursosString.reduce((a, b) => a + ', ' + b);
    }else{
      this.listaCurso = this.data.curso[0].curso
    }
  }

  ngOnInit(): void {}
}
