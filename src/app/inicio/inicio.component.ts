import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { initialConfig } from 'ngx-mask';
import { environment } from 'src/environments/environment';
import { TaskService } from '../services/task.service';


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
  showVendedores =false;
  isAdmin = false
  userId!: string;
  constructor(
    private authService: AuthService,
    private taskServices: TaskService,
    private router: Router,
    ) {}

  ngOnInit(): void {

    const { user } = JSON.parse(localStorage.getItem('user')!);
    this.userId = user.id
    
    this.teste()
    
  

  }

  teste() {
    this.taskServices.searchUserById(this.userId).subscribe(
      (res) => {
        this.isAdmin = res.user.status
        // this.localStorage.set("status", res.status)
      }
    );
  }

  

  goToCompras() {
    this.showVendas = false;
    this.showCursos = false;
    this.showAlunos = false;
    this.showCadastroVend = false;
    this.showVendedores =false;
   
    
  }

  goToVendas() {
    this.showVendas = true;
    this.showCursos = false;
    this.showAlunos = false;
    this.showCadastroVend = false;
    this.showVendedores =false;
    
    
    
  }
  goToCursos() {
    this.showVendas = false;
    this.showCursos = true;
    this.showAlunos = false;
    this.showCadastroVend = false;
    this.showVendedores =false;
    
    
  }

  goToVendedores() {
    this.showVendas = false;
    this.showCursos = false;
    this.showAlunos = false;
    this.showCadastroVend = false;
    this.showVendedores =true;
    
    
  }

  goToAlunos() {
    this.showVendas = false;
    this.showCursos = false;
    this.showAlunos = true;
    this.showCadastroVend = false;
    this.showVendedores =false;
    
    
  }
  goToCadastroVend() {
    this.showVendas = false;
    this.showCursos = false;
    this.showAlunos = false;
    this.showCadastroVend = true;
    this.showVendedores =false;
    
    
  }

  Logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
