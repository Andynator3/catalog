import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  //9-Déclaration d'un objet formulaire de type formGroup
  //Toutes les données qu'on va saisir dans un formulaire vont être stocker dans cet objet userFormGroup, c'est faire un data binding entre le formulaire et FormGroup.
  userFormGroup! : FormGroup;

  //14-Déclaration d'un message d'erreur
  errorMessage : any;

  //10-Injection des services : FormBuilder pour construire l'objet userFormGroup, authService, router.
  constructor(private fb : FormBuilder,
              private authService : AuthenticationService,
              private router : Router
              ) { }
  //11-Initialisation d'un formGroup qui contiendra les attributs du formulaire.
  ngOnInit() : void {
    //Création d'un formGroup qui contient les attributs du formulaire.
    this.userFormGroup=this.fb.group( {
      username : this.fb.control( ""),
      password : this.fb.control( "")
    });

  }

  // 13-Méthode de confirmation de connexion et d'erreur de appUser
  handleLogin() {
    // Récupération de username et password saisis
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    //Appel de la méthode login qui va vérifier le username, le password et retourne le appUser.
    this.authService.login(username, password).subscribe( {
      next : (appUser : AppUser)=>{
        this.authService.authenticateUser(appUser).subscribe( {
          next : (data : boolean)=>{
            this.router.navigateByUrl("/admin");
          }
        });
      },
      error : (err)=>{
        this.errorMessage = err;
      }
    });
  }

}


