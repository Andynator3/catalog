import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  // Déclaration de l'objet
  productFormGroup! : FormGroup;
  // Injection
  constructor(private fb : FormBuilder) {}

  ngOnInit(): void {
    this.productFormGroup = this.fb.group( {
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price : this.fb.control(null, [Validators.required]),
      promotion : this.fb.control(false, [Validators.required]),
    });
  }

  handleAddProduct() {
    console.log(this.productFormGroup.value);
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if(error['required']){
      return fieldName +" is Required";
    }else if(error['minlength']){
      return fieldName+" should have at least "+error['minlength']['RequiredLength']+" Characters";
    }else return "";
  }

}
