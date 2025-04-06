import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/core/models/SalesOrders/Category';
import { CategoryService } from 'src/app/core/services/SalesOrders/category.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements AfterViewInit {
displayedColumns: string[] = ['id', 'name','actions'];
  filterValues = {    id: '',name: ''}
  filterForm = new FormGroup({
    idFilter: new FormControl(''),
    nameFilter: new FormControl(''),

  });
  allColumnsFilter = new FormControl('');

  dataSource = new MatTableDataSource<Category>();
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService, private dialog: MatDialog,  private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.loadCategories();
    this.setupFilters();
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
    
      this.dataSource.data = categories;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
    });
  }
  setupFilters() {
    this.allColumnsFilter.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase();
    });
  }
  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      const searchTerm = filter.trim().toLowerCase();
      return (
        String(data.id).toLowerCase().includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm)
      );
    };
  }
  addCategory() {
      const dialogRef = this.dialog.open(CategoryDialogComponent, {
        width: '400px',
        data: { isEdit: false }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadCategories();
        }
      });
  }

    editCategory(category: Category) {
      const dialogRef = this.dialog.open(CategoryDialogComponent, {
        width: '400px',
        data: { isEdit: true, category }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadCategories();
        }
      });
    }
  printTable() {
    window.print();
  }
  
  exportTable() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Name,Price,Stock\n";
  
    this.dataSource.data.forEach((row) => {
      csvContent += `${row.id},${row.name}\n`;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
  }
  deleteCategory(id: number) {
      if (confirm('Are you sure?')) {
        this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
      }
    }
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
}
