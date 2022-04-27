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
  constructor() { }

  ngOnInit(): void {
  }
  goToVendas(){
    this.showVendas = true;
    this.showCursos = false;
  }
  goToCursos(){
    this.showVendas = false;
    this.showCursos = true;
  }
}
