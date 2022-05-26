import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  isAdmin = false;
  userId!: string;
  usuario!: string;
  

  constructor(
    private taskServices: TaskService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const { user } = JSON.parse(localStorage.getItem('user')!);
    this.userId = user.id;
    this.usuario = user.name;
    this.searchUserById();
    
  }

  searchUserById() {
    this.taskServices.searchUserById(this.userId).subscribe((res) => {
      this.isAdmin = res.user.status;
    });
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

 
}
