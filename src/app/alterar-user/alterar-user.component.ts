import { Component, OnInit } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-alterar-user',
  templateUrl: './alterar-user.component.html',
  styleUrls: ['./alterar-user.component.css']
})
export class AlterarUserComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _snackBar: MatSnackBar,
    

  ) { }

  ngOnInit(): void {
  }

  toggleAdmiro(){
    
  }
    closeSnackBar(){
      this._snackBar.dismiss()
    }

}


