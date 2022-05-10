import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroVendedorComponent } from './cadastro-vendedor/cadastro-vendedor.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { InicioComponent } from './inicio/inicio.component';
import { VendasComponent } from './vendas/vendas.component';
import { CadastroCursosComponent } from './cadastro-cursos/cadastro-cursos.component';
import { MatCardModule } from '@angular/material/card';
import { CursosComponent } from './cursos/cursos.component';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AlterarCursosComponent } from './alterar-cursos/alterar-cursos.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { AlunosComponent } from './alunos/alunos.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AlterarAlunosComponent } from './alterar-alunos/alterar-alunos.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ConfirmacaoComponent } from './vendas/confirmacao/confirmacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    InicioComponent,
    VendasComponent,
    CursosComponent,
    CadastroCursosComponent,
    AlterarCursosComponent,
    CadastroAlunoComponent,
    AlunosComponent,
    AlterarAlunosComponent,

    CadastroVendedorComponent,

    ConfirmacaoComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
