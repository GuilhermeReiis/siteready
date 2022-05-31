import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './views/home/home.component';
import { CadastroComponent } from './views/usuarios/cadastro/cadastro.component';
import { CompraComponent } from './views/compra/compra.component';
import { CadastroVendedorComponent } from './views/vendedores/cadastro-vendedor/cadastro-vendedor.component';
import { AlunosComponent } from '../app/views/alunos/alunos.component';
import { CursosComponent } from './views/cursos/cursos.component';
import { VendedoresComponent } from './views/vendedores/vendedores.component';
import { AllVendasComponent } from './views/all-vendas/all-vendas.component';

const routes: Routes = [
  ///////DEFOULT/////
  {
    path: '',
    component: HomeComponent,
  },

  ////CADASTROS DE LOGIN///////
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
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
    path: 'compra',
    component: CompraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
