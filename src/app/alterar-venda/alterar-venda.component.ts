import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service"


@Component({
  selector: 'app-alterar-venda',
  templateUrl: './alterar-venda.component.html',
  styleUrls: ['./alterar-venda.component.css']
})
export class AlterarVendaComponent implements OnInit {
  toppings = new FormControl();
  isSubmitted = false
  venda: any;
  teste = {message:'', error:false}

  toppingList: any;
  listaCurso: any;
  listCursos: any;
  constructor(
    public dialogRef: MatDialogRef<AlterarVendaComponent>,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)public data: any
  ) { 
    this.venda = this.fBuilder.group({
      aluno: [data.aluno.name],
      curso: [data.curso],
      vendedor: [data.vendedor.name],
      valor: [data._v],
      troco: [data.troco],
    });
  }

  ngOnInit(): void {
    this.toppingList = this.data.curso
    this.toppingList.forEach((cursosSelect: { curso: any; }) => {
      console.log(cursosSelect.curso)
    })
  }


  test() {
    this.isSubmitted=true
    console.log(this.venda.value)
    this.authService.alterarVenda(this.venda.value, this.data._id).subscribe(
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
  cancelar(): void {
    this.dialogRef.close();
    let carro = 'gol'
    
  }

}
