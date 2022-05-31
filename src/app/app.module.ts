import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './login/login.component';

import { AlunosComponent } from '../app/views/alunos/alunos.component';
import { CadastroAlunoComponent } from './views/alunos/cadastro-aluno/cadastro-aluno.component';

import { CursosComponent } from './views/cursos/cursos.component';
import { CadastroCursosComponent } from './views/cursos/cadastro-cursos/cadastro-cursos.component';
import { AlterarCursosComponent } from './views/cursos/alterar-cursos/alterar-cursos.component';

import { AllVendasComponent } from './views/all-vendas/all-vendas.component';
import { AlterarVendaComponent } from './views/compra/alterar-venda/alterar-venda.component';

import { VendedoresComponent } from './views/vendedores/vendedores.component';
import { CadastroVendedorComponent } from './views/vendedores/cadastro-vendedor/cadastro-vendedor.component';

import { AlterarUserComponent } from './views/vendedores/alterar-user/alterar-user.component';

import { CompraComponent } from './views/compra/compra.component';
import { CadastroComponent } from './views/usuarios/cadastro/cadastro.component';
import { ConfirmacaoComponent } from './views/compra/confirmacao/confirmacao.component';
import { HeaderComponent } from './header/header.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TextMaskModule } from 'angular2-text-mask';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AlterarAlunosComponent } from './views/alunos/alterar-aluno/alterar-aluno.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,

    AlunosComponent,
    AlterarAlunosComponent,
    CadastroAlunoComponent,
    
    CadastroAlunoComponent,
    
    CursosComponent,
    AlterarCursosComponent,
    CadastroCursosComponent,

    
    CadastroComponent,
    CompraComponent,
    CadastroVendedorComponent,
    ConfirmacaoComponent,
    VendedoresComponent,
    AlterarUserComponent,
    AllVendasComponent,
    AlterarVendaComponent,
    HeaderComponent,
    CompraComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    NgxChartsModule,
    TextMaskModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
