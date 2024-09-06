import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //2-Initialisation d'un tableau de users
  users : AppUser[]=[];
  //5-Déclaration de authenticatedUser
  authenticatedUser : AppUser | undefined;

  constructor() {
    //3-Création des users
    //Un objet user avec son userId de type string, son username de type string, son mot de passe de type string, son role de type string.
    this.users.push({userId : UUID.UUID(), username : "user1" , password : "1230", roles : ["USER"]});
    this.users.push({userId : UUID.UUID(), username : "user2" , password : "1230", roles : ["USER"]});
    this.users.push({userId : UUID.UUID(), username : "admin" , password : "1230", roles : ["USER", "ADMIN"]});
  }
  //4-Méthode qui permet de vérifier le appUser avec username et password de manière Asynchrone, si la vérification se fait le retour sera un AppUser
  public login(username : string, password : string) : Observable<AppUser> {
    //Recherche de username
    let appUser = this.users.find(u => u.username==username);
    //Test de username
    if(!appUser) return throwError( ()=>new Error("User not found"));
    //Test de password
    if(appUser.password!=password) {
      return throwError( ()=>new Error("Bad credentials"));
    }
    //Retour de user vérifié
    return of(appUser);
  }

  //6-Méthode d'authentification avec appUser
  public authenticateUser(appUser : AppUser) : Observable<boolean> {
    this.authenticatedUser = appUser;
    // Stocker les informations de l'utilisateur dans le local storage conversion javascript en JSON (JSON.stringify)
    localStorage.setItem("authUser", JSON.stringify({username : appUser.username, roles : appUser.roles, jwt : "JWT_TOKEN"}));
    // Retour de user authentifié
    return of(true);
  }

  //7-Méthode qui permet d'identifier le rôle d'un l'utilisateur
  public hasRole(role : string) : boolean {
     // Retour de user identifié
    return this.authenticatedUser!.roles.includes(role);
  }

  //8-Méthode qui permet d'indiquer si un user est authentifié ou non.
  public isAuthenticated() {
    // Retour de user indiqué
    return this.authenticatedUser != undefined;
  }

  //21-Méthode qui permet de vérifier la déconnexion
  public logout() : Observable<boolean>{
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }

}
