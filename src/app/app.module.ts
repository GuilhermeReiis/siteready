import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TextMaskModule } from 'angular2-text-mask';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxMaskModule } from 'ngx-mask';

import { AlunosComponent } from '../app/views/alunos/alunos.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AllVendasComponent } from './views/all-vendas/all-vendas.component';
import { AlterarVendaComponent } from './views/all-vendas/alterar-venda/alterar-venda.component';
import { AlterarAlunosComponent } from './views/alunos/alterar-aluno/alterar-aluno.component';
import { CadastroAlunoComponent } from './views/alunos/cadastro-aluno/cadastro-aluno.component';
import { CompraComponent } from './views/compra/compra.component';
import { ConfirmacaoComponent } from './views/compra/confirmacao/confirmacao.component';
import { AlterarCursosComponent } from './views/cursos/alterar-cursos/alterar-cursos.component';
import { CadastroCursosComponent } from './views/cursos/cadastro-cursos/cadastro-cursos.component';
import { CursosComponent } from './views/cursos/cursos.component';
import { HomeComponent } from './views/home/home.component';
import { CadastroComponent } from './views/usuarios/cadastro/cadastro.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { AlterarUserComponent } from './views/vendedores/alterar-user/alterar-user.component';
import { CadastroVendedorComponent } from './views/vendedores/cadastro-vendedor/cadastro-vendedor.component';
import { VendedoresComponent } from './views/vendedores/vendedores.component';




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
    MatStepperModule,
    AccordionModule.forRoot(),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
