import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //Déclaration des produits
  private products! : Product[];
  // private products! : Array<Product>

  constructor() {
    //Construction d'une liste de produits
    this.products = [
      {id:UUID.UUID(), name: 'Computer', price: 1500, promotion: true},
      {id:UUID.UUID(), name: 'Printer', price: 1000,promotion: false},
      {id:UUID.UUID(), name: 'Smart phone', price: 1800,promotion: true},
      {id:UUID.UUID(), name: 'Screen', price: 200,promotion: false},
      // { id: 1, name: 'Computer', price: 1500, promotion: true },
      // { id: 2, name: 'Printer', price: 1000,promotion: false },
      // { id: 3, name: 'Smart phone', price: 1800,promotion: true },
      // { id: 4, name: 'Computer screen', price: 200,promotion: false },
    ];
    //Faire une boucle pour remplir le tableau de produits
    for (let i = 0; i < 10; i++) {
      this.products.push({id:UUID.UUID(), name: 'Computer', price: 1500, promotion: true}),
      this.products.push({id:UUID.UUID(), name: 'Printer', price: 1000,promotion: false}),
      this.products.push({id:UUID.UUID(), name: 'Smart phone', price: 1800,promotion: true}),
      this.products.push({id:UUID.UUID(), name: 'Screen', price: 200,promotion: false})
    }

   }
   // Trouver tous les produits, programmation réative ou Asynchrone
   public getAllProducts() : Observable<Product[]>{
    //Je génere un nombre alléatoire entre 0 et 1
    let rnd=Math.random();
    //Retourner une erreur sous forme d'Observable
    if(rnd<0.1) return throwError( ()=>new Error("Internet connexion error"));
    //On retourne on component un tableau qui contient une copie de l'objet products -> [...this.products]
    else return of ([...this.products]);
   }
   // Trouver tous les produits dans le service, programmation réative ou Asynchrone
  //  public getAllProducts() : Observable<Array<any>>{
  //    return of (this.products);
  //  }

   // Trouver tous les produits dans le service, programmation impérative ou Synchrone
  //  public getAllProducts() {
  //   return this.products;
  //  }

  // Trouver une page de produits, programmation réative ou Asynchrone
  //Chercher une page dans la liste des pages
   public getPageProducts(page : number, size : number) : Observable<PageProduct>{
    //Calcul de l'index
    let index = page*size;
    //Calculer le total des pages avec deux tildes(~~) pour la division entière
    let totalPages = ~~(this.products.length/size);
    //Condition pour la longueur de la liste
    if(this.products.length % size !=0)
      totalPages++;
    //On retourne un autre tableau pageProducts qui contient la page de produits qu'on veut.
    let pageProducts = this.products.slice(index, index+size);
    //On calcule la page
    return of( {page:page, size:size, totalPages:totalPages, products : pageProducts});
   }

  // Supprimer un produit dans le service dont on connait son id, programmation réative ou Asynchrone
  public deleteProduct(id : string) : Observable<boolean>{
    //Parcourir le tableau en le filtrant pour trouver la position afin de supprimer
    //p=>p.id!=id (Pour chaque p du tableau, p.id est different de id, je garde le produit, si p.id==id, on ne le prend pas, on le supprime)
    this.products = this.products.filter(p=>p.id!=id);
    //On retourne un boolean
    return of(true);
  }
  //Changer la promotion d'un produit dans le service dont on connait son id, programmation réative ou Asynchrone
  public setPromotion(id : string) : Observable<boolean>{
    //Parcourir le tableau pour trouver la promotion
    let product = this.products.find(p=>p.id==id);
    if(product !=undefined) {
      product.promotion=!product.promotion;
      return of(true);
    //Retourner une erreur sous forme d'Observable
    }else return throwError( ()=>new Error("Product not found"));
  }

  //La recherche d'un produit dans le service, programmation réative ou Asynchrone
  //La méthode reçoit keyword de type string et retourne un objet Observable qui contient une liste de produits
  public searchProducts(keyword : string, page : number, size : number) : Observable<PageProduct> {
    //Parcourir le tableau en le filtrant
    //p=>p.name.includes(keyword) (Pour chaque p du tableau,je garde que les produits p dans lequel name contient keyword.
    //Retourne une liste de produits dont le nom contient uniquement keyword.
    let result = this.products.filter(p=>p.name.includes(keyword));
     //Calcul de l'index
     let index = page*size;
     //Calculer le total des pages avec deux tildes(~~) pour la division entière
     let totalPages = ~~(result.length/size);
     //Condition pour la longueur de la liste
     if(this.products.length % size !=0)
       totalPages++;
     //On retourne un autre tableau pageProducts qui contient la page de produits qu'on veut.
     let pageProducts = result.slice(index, index+size);
    //On calcule la page
    return of( {page:page, size:size, totalPages:totalPages, products : pageProducts});

  }

  // //La recherche d'un produit dans le service, programmation réative ou Asynchrone
  // //La méthode reçoit keyword de type string et retourne un objet Observable qui contient une liste de produits
  // public searchProducts(keyword : string) : Observable<Product[]> {
  //   //Parcourir le tableau en le filtrant
  //   //p=>p.name.includes(keyword) (Pour chaque p du tableau,je garde que les produits p dans lequel name contient keyword.
  //   //Retourne une liste de produits dont le nom contient uniquement keyword.
  //   let products = this.products.filter(p=>p.name.includes(keyword));
  //   return of(products);
  // }

}
