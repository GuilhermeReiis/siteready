import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { LocalStorageService } from '../local-storage.service';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  userId!: string;
  usuario!: string;

  constructor(
    private taskServices: TaskService,
    private router: Router,
    private localStorage: LocalStorageService,
    public authService : AuthService,
  ) { }

  ngOnInit(): void {
    // const { user } = JSON.parse(localStorage.getItem('user')!);
    // this.userId = user.id;
    // this.usuario = user.name;
    // this.searchUserById();
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  searchUserById() {
    this.taskServices.searchUserById(this.userId).subscribe((res) => {
      this.isAdmin = res.user.status;
    });
  }

}
