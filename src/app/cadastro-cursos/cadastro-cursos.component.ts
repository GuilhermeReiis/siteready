import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";

@Component({
  selector: 'app-cadastro-cursos',
  templateUrl: './cadastro-cursos.component.html',
  styleUrls: ['./cadastro-cursos.component.css']
})
export class CadastroCursosComponent implements OnInit {
  curso: FormGroup;
  isSubmitted = false

  teste = {message:'', error:false}
  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.curso = this.fBuilder.group({
      curso: ["",[Validators.required] ],
      duracao: ["",[Validators.required] ],
      valor: ["",[Validators.required] ],
      descricao: ["",[Validators.required] ],
    });
  }

  ngOnInit(): void {
    console.log(this.curso)
  }


  send() {
    this.isSubmitted=true
    console.log(this.curso.controls)
    this.authService.createCourse(this.curso.value).subscribe(
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
  }
}
