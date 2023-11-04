import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category','date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




 constructor(private dialog:MatDialog,private api:ApiService ){}
ngOnInit(): void {
    this.getAllProduct();
}


  
openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%'

    }).afterClosed().subscribe(val=>{
      this.getAllProduct();
    })
  }

  getAllProduct(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        console.log(res);
      },
      error:()=>{
        alert("error while fetching the recordss");
      }
    })
  }
  

editProduct(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllProduct();
    }
  })
  

}



deleteProduct(id :number){
  this.api.deleteProduct(id).subscribe({
    next:(res)=>{
      alert("Product Delete Successfully")
      this.getAllProduct();
    },
    error:()=>{
      alert("Error while deleting the product!!")
    }
  })
  

}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
