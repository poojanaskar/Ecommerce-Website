
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryService } from '../../../services/category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterModule ,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements AfterViewInit{
 displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // name : string ="pooja"
 categoryList : any[]=[];
  constructor( private service : CategoryService) {
   
    this.dataSource = new MatTableDataSource([] as any);
  }
   ngOnInit(){
   this.fetchCategories()
    
    
   }
    fetchCategories(){
this.service.getCategoryList().subscribe({
      next :(res)=>{
            if (res.success) {
      console.log('Category List:', res.data);
      this.dataSource.data = res.data // Assign only the array
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
      },
  error: (err) => {
    console.error('Error:', err);
  }
    })
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

 deleteCategory(id:string){
this.service.deleteCategory(id).subscribe({
  next :(res:any)=> {
    if(res.success){
      alert("category item deleted succesfully")
    }
   this.fetchCategories()
  },

  error:(err:any)=> {
     alert("category  notitem deleted succesfully")
  }

})

 }
}



