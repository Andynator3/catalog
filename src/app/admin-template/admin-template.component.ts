import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {
  //19-Injection des service :
  constructor(public  authService : AuthenticationService, private router : Router) {

  }

  ngOnInit(): void {

  }

  //22-Méthode qui permet de confirmer la déconnexion
  handleLogout(){
    this.authService.logout().subscribe( {
      next : (data : boolean)=>{
        this.router.navigateByUrl("/login");
      }
    });
  }

}
