import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';



import { Inject } from '@angular/core';


@Component({
  selector: 'app-alterar-alunos',
  templateUrl: './alterar-alunos.component.html',
  styleUrls: ['./alterar-alunos.component.css']
})
export class AlterarAlunosComponent implements OnInit {
  alunos: FormGroup;
  isSubmitted = false

  cursos: any = [];
  teste = {message:'', error:false}
  taskServices: any;
  
  constructor(
    public dialogRef: MatDialogRef<AlterarAlunosComponent>,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.alunos = this.fBuilder.group({
      name: ["", ],
      age: ["", ],
      email: ["",],
      tell: ["", ],
    });
  }

  

  ngOnInit(): void {
    console.log(this.data)
    this.taskServices.getTasks().subscribe((res: any) => {
      this.cursos = res.cursos;
    });
  }


  cancelar(): void {
    this.dialogRef.close();
    let carro = 'gol'
    
  }


  test() {
    this.isSubmitted=true
    console.log(this.alunos.value)
    this.authService.alterarAluno(this.alunos.value, this.data._id).subscribe(
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
    console.log("fechando alterar")
    this.dialogRef.close();
    this.ngOnInit();
  }


}
