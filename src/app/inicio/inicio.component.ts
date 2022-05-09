import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { initialConfig } from 'ngx-mask';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  showFiller = false;
  showVendas = true;
  showCursos = false;
  showAlunos = false;
  showCadastroVend = false;
  
  isAdmin: any = false 

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    
    this.isAdmin = environment.verificacao

  }
  

  goToCompras() {
    this.showVendas = false;
    this.showCursos = false;
    this.showAlunos = false;
    this.showCadastroVend = false;
   
    
  }

  goToVendas() {
    this.showVendas = true;
    this.showCursos = false;
    this.showAlunos = false;
    this.showCadastroVend = false;
    
    
    
  }
  goToCursos() {
    this.showVendas = false;
    this.showCursos = true;
    this.showAlunos = false;
    this.showCadastroVend = false;
    
    
  }
  goToAlunos() {
    this.showVendas = false;
    this.showCursos = false;
    this.showAlunos = true;
    this.showCadastroVend = false;
    
    
  }
  goToCadastroVend() {
    this.showVendas = false;
    this.showCursos = false;
    this.showAlunos = false;
    this.showCadastroVend = true;
    
    
  }

  Logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
