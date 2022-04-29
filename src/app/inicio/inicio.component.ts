import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  showFiller = false;
  showVendas = true;
  showCursos = false;
  showAlunos = false;
  constructor() { }

  ngOnInit(): void {
  }
  goToVendas(){
    this.showVendas = true;
    this.showCursos = false;
    this.showAlunos = false;
  }
  goToCursos(){
    this.showVendas = false;
    this.showCursos = true;
    this.showAlunos = false;
  }
  goToAlunos(){
    this.showVendas = false;
    this.showCursos = false;
    this.showAlunos = true;
  }
  
}
