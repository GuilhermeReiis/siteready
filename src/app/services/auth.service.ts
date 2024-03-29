import { Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { EmailValidator } from "@angular/forms";


interface IUser{
email:string,
password:string
}

interface ICadastro{
  name: string,
  cpf: string,
  email: string,
  password: string
}

interface ICurso{
  curso: string,
  duracao: number,
  valor: number,
  descricao: string,
}

interface IAluno{
  name: string,
  email: EmailValidator,
  age:number,
  tell:number,
  curso:string,
}

interface IVenda{
  aluno: object,
  curso: [{}],
  vendedor: object,
  valorPago: number,
  troco: number
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  
  private URL = "http://localhost:8080";
  constructor(private http: HttpClient, private router: Router) {}

  signUpUser(user:IUser) {
    return this.http.post<any>(this.URL + "/login", user);
  }

  signInUser(user:IUser) {
    return this.http.post<any>(this.URL + "/login", user);
  }

  cadastrar(cadastro:ICadastro) {
    return this.http.post<any>(this.URL + "/user", cadastro);
  }

  findOneUser() {
    return this.http.get<any>(this.URL + "/one");
  }

  loggedIn() {
    // this.mostrarMenuEmitter.emit(true);
    return !!localStorage.getItem("user");
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  createCourse(curso: ICurso){
    return this.http.post<any>(this.URL + "/curso", curso);

  }

  alterarCurso(curso: ICurso,id: string){
    return this.http.put<any>(this.URL + "/curso/" +id, curso);
  }

  // //////////////////////////////////////////////////////////////

  addAluno(aluno: IAluno){
    return this.http.post<any>(this.URL + "/aluno", aluno);

  }

  searchAluno(){
    return this.http.get<any>(this.URL + "/aluno");
  }

  deleteAluno(aluno: IAluno, id: string){
    return this.http.delete<any>(this.URL + "/aluno/" +id);
  }

  alterarAluno(aluno: IAluno,id: string){
    return this.http.put<any>(this.URL + "/aluno/" +id, aluno);
  }
  
  alterarUser(User: IUser,id: string){
    return this.http.put<any>(this.URL + "/users/" +id, User);
  }

  alterarVenda(venda: IVenda,id: string){
    return this.http.put<any>(this.URL+ "/venda/" +id, venda)
  }

}
