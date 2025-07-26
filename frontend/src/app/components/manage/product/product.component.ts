import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-product',
  imports: [  RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit {

 displayedColumns: string[] = ['id', 'name',  'price' ,'shortDescription','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 categoryList: any[] = [];
  constructor(private service: ProductService) {
    this.dataSource = new MatTableDataSource([] as any);
  }

   ngOnInit() {
    this.fetchCategories();
  }
  fetchCategories() {
    console.log('hiy');
    this.service.getProduct().subscribe({
      next: (res) => {
        if (res) {
          console.log('Category List:', res);
          this.dataSource.data = res.data;
            console.log(' this.dataSource.data',  this.dataSource.data);
          this.dataSource.paginator = this.paginator;
            console.log(' this.dataSource.paginator',  this.dataSource.paginator);
          this.dataSource.sort = this.sort;
              console.log(' this.dataSource.sort',  this.dataSource.sort);
        }
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   deleteProduct(id: string) {
    console.log("id" , id)
    this.service.deleteProduct(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          
          alert('category item deleted succesfully');
        }
        this.fetchCategories();
      },

      error: (err: any) => {
        alert('category  notitem deleted succesfully');
      },
    });
  }

}
