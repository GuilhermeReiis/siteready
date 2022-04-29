import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {
  aluno: FormGroup;
  isSubmitted = false

  teste = {message:'', error:false}
  constructor(
    public dialogRef: MatDialogRef<CadastroAlunoComponent>,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.aluno = this.fBuilder.group({
      name: ["",[Validators.required] ],
      email: ["",[Validators.required] ],
      age: ["",[Validators.required] ],
      tell: ["",[Validators.required] ],
      curso: ["",[Validators.required] ],
    });
  }
  

  ngOnInit(): void {
    console.log(this.aluno)
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  deleteAluno(num:number){

  }

  send() {
    this.isSubmitted=true
    console.log(this.aluno.controls)
    this.authService.addAluno(this.aluno.value).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        this.dialogRef.close();
      },
      (err) => {
        
        this.teste.message = err.error.message
        this.teste.error = err.error.error
        console.log(err.error)
      
      }
    );
  }




}
