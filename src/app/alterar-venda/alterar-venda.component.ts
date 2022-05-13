import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service"
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-alterar-venda',
  templateUrl: './alterar-venda.component.html',
  styleUrls: ['./alterar-venda.component.css']
})
export class AlterarVendaComponent implements OnInit {
  toppings = new FormControl();
  isSubmitted = false
  venda: any;
  teste = {message:'', error:false}

  toppingList!: [''];
  listaCurso: any;
  listCursos: any;
  selectedCourses: any[] | undefined;
  constructor(
    public dialogRef: MatDialogRef<AlterarVendaComponent>,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA)public data: any
  ) { 
    this.venda = this.fBuilder.group({
      aluno: [data.aluno.name],
      curso: [this.toppings],
      vendedor: [data.vendedor.name],
      valor: [data._v],
      troco: [data.troco],
    });
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res) => {
      this.toppingList = res.cursos.map((res:any) => {
        return res.curso
      })
    });
  }


  addAndRemoveCourse(row = this.toppings.value , add = true){
    if (add) {
      row.enabled = true;
      this.toppings.value.add(row);
    } else {
      row.enabled = false;
      this.toppings.value.delete(row);
    }
    this.selectedCourses = [...this.toppings.value];
    console.log(this.selectedCourses)
  }

  test() {
    this.isSubmitted = true;
    const cursoSelected = this.data.curso.map((res: any) => {
      return res._id;
    });

    const arrayCurso = cursoSelected.concat(this.data.aluno.curso);
    console.log(arrayCurso);
    this.venda.value.aluno.curso = arrayCurso;

    this.authService
      .alterarAluno(this.venda.value.aluno, this.venda.value.aluno._id)
      .subscribe((res) => {
        console.log(res);
      });

    this.isSubmitted=true
    console.log(this.venda.value)
    this.authService.alterarVenda(this.venda.value, this.data._id).subscribe(
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
    console.log("5555")
    this.dialogRef.close();
    this.ngOnInit();
  }
  cancelar(): void {
    this.dialogRef.close();
    let carro = 'gol'
    
  }

}
