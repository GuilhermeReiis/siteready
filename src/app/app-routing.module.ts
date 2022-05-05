import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './views/home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { CadastroCursosComponent } from './cadastro-cursos/cadastro-cursos.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { VendasComponent } from './vendas/vendas.component';
import { EndVendaComponent } from './end-venda/end-venda.component';
import { CadastroVendedorComponent } from './cadastro-vendedor/cadastro-vendedor.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'cadastra_Aluno',
    component: CadastroAlunoComponent
  },
  {
    path:'cadastra-vendedor',
    component: CadastroVendedorComponent
  },
  {
    path:'Cadastro_Curso',
    component: CadastroCursosComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'cadastro',
    component: CadastroComponent
  },
  {
    path:'inicio',
    component: InicioComponent
  },
  {
    path:'endVenda',
    component: EndVendaComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
