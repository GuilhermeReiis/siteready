import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './views/home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { VendasComponent } from './vendas/vendas.component';
import { CadastroVendedorComponent } from './cadastro-vendedor/cadastro-vendedor.component';
import { AlunosComponent } from './alunos/alunos.component';
import { CursosComponent } from './cursos/cursos.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { AllVendasComponent } from './all-vendas/all-vendas.component';

const routes: Routes = [
  ///////DEFOULT/////
  {
    path: '',
    component: HomeComponent,
  },

  ////CADASTROS DE LOGIN///////
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },

  ////////MODULO DE INICIO/////
  {
    path: 'inicio',
    component: InicioComponent,
  },

  ////////BOTÔES/////////
  {
    path: 'alunos',
    component: AlunosComponent,
  },
  {
    path: 'cursos',
    component: CursosComponent,
  },
  {
    path: 'vendedores',
    component: VendedoresComponent,
  },
  {
    path: 'cadastra-vendedor',
    component: CadastroVendedorComponent,
  },
  {
    path: 'vendas',
    component: AllVendasComponent,
  },
  {
    path: 'vender',
    component: VendasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
