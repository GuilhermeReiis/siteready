import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private URL = "http://localhost:8080";
  static filter: string;
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any>(this.URL + "/cursos");
  }

  getAlunos() {
    return this.http.get<any>(this.URL + "/aluno");
  }

  getVendas() {
    return this.http.get<any>(this.URL + "/venda");
  }

  addVenda(venda: any){
    return this.http.post<any>(this.URL + "/venda", venda);
  }

  getPrivateProject() {
    return this.http.get<any>(this.URL + "/");
  }

  getProjectById(id: string) {
    return this.http.get<any>(this.URL + "/" + id);
  }

  createProject(project:any) {
    return this.http.post(this.URL, project);
  }

  updateProject(project:any) {
    const url = `${this.URL}/${project._id}`;

    console.log(project);
    delete project._id;

    return this.http.put(url, project);
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.URL}/curso/${id}`);
  }

  deleteAlunos(id: string) {
    return this.http.delete(`${this.URL}/aluno/${id}`);
  }

  alterarProject(id: string) {
    return this.http.delete(`${this.URL}/alterar/${id}`);
  }

  searchUser() {
    return this.http.get<any>(this.URL + "/users");
  }

  searchUserById(id?:string) {
    return this.http.get<any>(`${this.URL}/users/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.URL}/users/${id}`);
  }
  deleteVenda(id: string) {
    return this.http.delete(`${this.URL}/venda/${id}`)
  }
}
