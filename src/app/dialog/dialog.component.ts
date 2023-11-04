import { Component, Inject, OnInit, inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
freshnessList=["Brand New", "second Hand", "Refurbished"]
actionBtn:string="Save";
ProductForm!:FormGroup;
constructor( private FormBuilder: FormBuilder,
  private api:ApiService, 
   @Inject(MAT_DIALOG_DATA) public editData:any,
  private dialogRef: MatDialogRef<DialogComponent>){}
 
getProductData!:any;

ngOnInit(): void {
    this.ProductForm=this.FormBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['', Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    })
    console.log(this.editData);
    if(this.editData){
      this.actionBtn="Update"
      this.ProductForm.controls['productName'].setValue(this.editData.productName);
      this.ProductForm.controls['category'].setValue(this.editData.category);
      this.ProductForm.controls['freshness'].setValue(this.editData.freshness);
      this.ProductForm.controls['price'].setValue(this.editData.price);
      this.ProductForm.controls['comment'].setValue(this.editData.comment);
      this.ProductForm.controls['date'].setValue(this.editData.date);
    
    }
    
}
addProduct(){
  
  console.log(this.ProductForm.value);
   if(!this.editData){
    if(this.ProductForm.valid){
      this.api.postProduct(this.ProductForm.value).subscribe({next:(res)=>{
        alert("Product added successfully");
        this.ProductForm.reset();
        this.dialogRef.close('save');
       
      },
      error:()=>{
        alert("Error while adding the product");
    
      }
      })
      }
    }else{
      this.updateProduct()
    }
  }
    
updateProduct(){
  this.api.putProduct(this.ProductForm.value, this.editData.id).subscribe({
    next:(res)=>{
      alert("Product update Sucessfully");
      this.ProductForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while updating the record!!");
    }
  })


    }
   
 
}




