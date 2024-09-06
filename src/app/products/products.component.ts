
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageProduct, Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //Déclaration d'un tableau de produits
  products!: Product[];
  //products!: Array<Product>;
  //Déclaration de la page
  currentPage : number=0;
  //Déclaration de la size
  pageSize : number = 5;
  //Déclaration du nombre de pages
  totalPages : number = 0;
  //Déclaration de message d'erreur
  errorMessage!: string;
  //Déclaration formulaire
  searchFormGroup! : FormGroup;
  currentAction : string="all";

  // Injection d'un service
  constructor(private productService: ProductService,
              private fb : FormBuilder,
              public authService : AuthenticationService,
              private router : Router
              ) {}

  ngOnInit(): void {
    //Création d'un formulaire
    this.searchFormGroup=this.fb.group( {
      //Les noms des champs du formulaire
      keyword : this.fb.control( null)
      //La liaison de la zone de texte avec un data binding

    });
    //Appel de la méthode handleGetAllProducts dans la méthode d'initialisation ngOnInit
    this.handleGetPageProducts();

    //Appel de la méthode handleGetAllProducts dans la méthode d'initialisation ngOnInit
    // this.handleGetAllProducts();
    // Utilisation du service dans la méthode ngOnInit, subscription, programmation réative ou Asynchrone
    //   this.productService.getAllProducts().subscribe( {
    // Si tout se passe bien et que les données arrivent
    //     next : (data : any[])=> {
    //Stockage des données
    //      this.products=data;
    //     },
    // Si tout se passe mal et que les données n'arrivent pas
    //     error : (err)=> {
    // Le message d'erreur
    //       this.errorMessage=err;
    //     }
    //   });

    // Utilisation du service dans la méthode ngOnInit,programmation impérative ou Synchrone
    // this.products=this.productService.getAllProducts();
  }

   // Trouver tous les produits dans le component, programmation réative ou Asynchrone
   handleGetPageProducts() {
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      // Si tout se passe bien et que les données arrivent
      next: (data: PageProduct) => {
        //On reçoit une liste de produit
        this.products = data.products;
        //On reçoit la liste totale de pages
        this.totalPages=data.totalPages;
        // console.log( this.totalPages);

      },
      // Si tout se passe mal et que les données n'arrivent pas
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  // Trouver tous les produits dans le component, programmation réative ou Asynchrone
  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      // Si tout se passe bien et que les données arrivent
      next: (data: Product[]) => {
        //On reçoit tous les produits
        this.products = data;
      },
      // Si tout se passe mal et que les données n'arrivent pas
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  // Supprimer un produit dans le component dont on connait son id, programmation réative ou Asynchrone
  handleDeleteProduct(p: Product) {
    //Message d'alerte avant suppression
    let conf=confirm("Are you sure ?");
    if(conf==false) return;
    this.productService.deleteProduct(p.id).subscribe({
       // Si tout se passe bien et que la donnée arrive
      next: (data: boolean) => {
        //Pour supprimer l'élément dans le tableau front-end
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
        //Recharger ou raffrechir les données dans le front-end après la suppression dans le back-end
        // this.handleGetAllProducts();
      }
    })
  }

  // Supprimer un produit dans le component, programmation impérative ou Synchrone
  // handleDeleteProduct(p: any) {
  //   let index = this.products.indexOf(p);
  //   this.products.splice(index, 1);
  // }

  //Changer la promotion d'un produit dans le component dont on connait son id, programmation réative ou Asynchrone
  handleSetPromotion(p: Product) {
    //Initialiser la promo qui peut être soit true soit false au départ
    let promo=p.promotion;
    this.productService.setPromotion(p.id).subscribe( {
       // Si tout se passe bien et que les données arrivent
      next : (data : boolean)=>{
       // console.log("O.K");

        //Changer la promotion
        p.promotion=!promo;
      },
      // Si tout se passe mal et que les données n'arrivent pas
      error : err=> {
        // Le message d'erreur
        this.errorMessage=err;
      }
    })
  }

   //La recherche d'un produit dans le component, programmation réative ou Asynchrone
   handleSearchProducts() {
    this.currentAction="search";
    this.currentPage=0;
    //Récupération de keyword quand on valide le formulaire
    let keyword=this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword, this.currentPage, this.pageSize).subscribe( {
      next : (data : PageProduct)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      }
    })
    }

  // //La recherche d'un produit dans le component, programmation réative ou Asynchrone
  // handleSearchProducts() {
  //   //Récupération de keyword quand on valide le formulaire
  //   let keyword=this.searchFormGroup.value.keyword;
  //   this.productService.searchProducts(keyword).subscribe( {
  //     next : (data : Product[])=>{
  //       this.products=data;
  //     }
  //   })
  //   }

  gotoPage(i : number) {
    //La page courrante
    this.currentPage=i;
    if(this.currentAction==="all")
     //On fait la recherche
     this.handleGetPageProducts();
    //On fait la recherche
    else
    this.handleSearchProducts();
  }

  handleNewProduct() {
    this.router.navigateByUrl("/admin/newProduct");
  }

}
