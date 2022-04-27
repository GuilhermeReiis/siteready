import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastro: FormGroup;
  isSubmitted = false

  teste = {message:'', error:false}
  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.cadastro = this.fBuilder.group({
      name: ["",[Validators.required] ],
      cpf: ["",[Validators.required] ],
      email: ["",[Validators.required] ],
      password: ["",[Validators.required] ],
    });
  }

  ngOnInit(): void {
    console.log(this.cadastro)
  }

  cadastrar() {
    this.isSubmitted=true
    console.log(this.cadastro.controls)
    this.authService.cadastrar(this.cadastro.value).subscribe(
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
