import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';

@Component({
  selector: 'app-alterar-cursos',
  templateUrl: './alterar-cursos.component.html',
  styleUrls: ['./alterar-cursos.component.css']
})
export class AlterarCursosComponent implements OnInit {
  curso: FormGroup;
  isSubmitted = false


  teste = {message:'', error:false}
  constructor(
    public dialogRef: MatDialogRef<AlterarCursosComponent>,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)public data: any
  ) {
    this.curso = this.fBuilder.group({
      curso: [data.curso, ],
      duracao: [data.duracao, ],
      valor: [data.valor,],
      area: [data.area],
      modalidade: [data.modalidade],
      descricao: [data.descricao, ],
    });
   }

  ngOnInit(): void {
    // console.log(this.curso)
    console.log(this.data)
  }

  cancelar(): void {
    this.dialogRef.close();
    let carro = 'gol'
    
  }


  test() {
    this.isSubmitted=true
    console.log(this.curso.value)
    this.authService.alterarCurso(this.curso.value, this.data._id).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        this.router.navigate(["/inicio"]);
      },
      (err) => {
        
        this.teste.message = err.error.message
        this.teste.error = err.error.error
        console.log(err.error)
      
      }
    );
    console.log("5555")
    this.dialogRef.close();
    this.ngOnInit();
  }


}
