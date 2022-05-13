import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";
import { MatDialogRef } from '@angular/material/dialog';
import { AlunosComponent } from '../alunos/alunos.component';
import { TaskService } from '../services/task.service';
import { emailMask } from 'text-mask-addons';




@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {
  aluno: FormGroup;
  isSubmitted = false
  cursos: any = [];
  dataSource = TaskService;
  curso = new FormControl();
  cursoList: any = []
  emailMask = emailMask;

  teste = {message:'', error:false}
  constructor(
    public dialogRef: MatDialogRef<CadastroAlunoComponent>,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private taskServices: TaskService
  ) { 
    this.aluno = this.fBuilder.group({
      name: ["",[Validators.required] ],
      email: ["",[Validators.required] ],
      age: ["",[Validators.required] ],
      tell: ["",[Validators.required] ],
      
    });
    
  }
  

  ngOnInit(): void {
    console.log(this.aluno)
    this.taskServices.getTasks().subscribe((res: any) => {
      this.cursoList = res.cursos;
    });
    
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  deleteAluno(num:number){

  }

  send() {
    this.isSubmitted=true

   

    
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
    console.log(this.curso)
    this.dialogRef.close();
    this.ngOnInit();
  }

  


}
