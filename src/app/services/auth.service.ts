import { Injectable } from "@angular/core";
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
    return !!localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/tasks"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  createCourse(curso: ICurso){
    return this.http.post<any>(this.URL + "/curso", curso);

  }
}
