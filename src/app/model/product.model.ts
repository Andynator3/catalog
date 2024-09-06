export interface Product {
  id : string;
  // id : number;
  name : string;
  price : number;
  promotion : boolean;
}

export interface PageProduct {
  //La liste de produits
  products : Product[];
  //Garder le numéro de la page
  page : number;
  // La taille de produits sur la page
  size : number;
  //Le nombre total de pages
  totalPages : number;

}

