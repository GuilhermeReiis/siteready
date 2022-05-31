import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../../../services/auth.service"
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { VendedoresComponent } from '../vendedores.component';
import { emailMask } from 'text-mask-addons';
@Component({
  selector: 'app-cadastro-vendedor',
  templateUrl: './cadastro-vendedor.component.html',
  styleUrls: ['./cadastro-vendedor.component.css']
})

export class CadastroVendedorComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  cadastro: FormGroup;
  isSubmitted = false
  isChecked = false;
  emailMask = emailMask;
  teste = {message:'', error:false}

  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    
  ) { 

    this.cadastro = this.fBuilder.group({
      name: ["",[Validators.required] ],
      cpf: ["",[Validators.required] ],
      email: ["",[Validators.required] ],
      tell: ["",[Validators.required]],
      password: ["",[Validators.required] ],
      status: false
    });

  }

  ngOnInit(): void {
    console.log(this.cadastro.value)
  }

  cadastrar() {
    this.isSubmitted=true
    console.log(this.cadastro.value)

    if(this.cadastro.valid){
      this.authService.cadastrar(this.cadastro.value).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem("token", res.token);
          this._snackBar.open("Usuario cadstrado com sucesso!");
          window.location.reload()
      },
      (err) => {
        
        this._snackBar.open(err.error.message, 'Fechar', {duration: 2000});
        console.log(err.error)
        
      }
      
      );
    }
  }


  toggleAdmiro(){
    console.log(this.cadastro.controls)
  }
    closeSnackBar(){
      this._snackBar.dismiss()
    }

}
