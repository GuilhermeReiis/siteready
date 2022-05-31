import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { emailMask } from 'text-mask-addons';

@Component({
  selector: 'app-alterar-user',
  templateUrl: './alterar-user.component.html',
  styleUrls: ['./alterar-user.component.css'],
})
export class AlterarUserComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  user: FormGroup;
  isSubmitted = false;
  teste = {message:'', error:false};
  emailMask = emailMask;
  constructor(
    private _snackBar: MatSnackBar,
    private fBuilder: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA)public data: any
  ) {
    this.user = this.fBuilder.group({
      name: [data.name, [Validators.required]],
      cpf: [data.cpf, [Validators.required]],
      email: [data.email, [Validators.required]],
      tell: [data.tell, [Validators.required]],
      password: ['', ],
      status: false,
    });

  }

  ngOnInit(): void {
    console.log(this.data)
  }

  toggleAdmiro() {}
  closeSnackBar() {
    this._snackBar.dismiss();
  }

  send() {
    this.isSubmitted = true;
    console.log(this.user.value);
    this.authService.alterarUser(this.user.value, this.data._id).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        
      },
      (err) => {

        this.teste.message = err.error.message
        this.teste.error = err.error.error
        console.log(err.error)
      }
    )
    
  }
}
