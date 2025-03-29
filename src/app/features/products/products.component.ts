import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/core/models/SalesOrders/Product';
import { ProductService } from 'src/app/core/services/SalesOrders/product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'category','actions'];
  filterValues = {    id: '',name: '',price: '',stock: '',category: ''}
  filterForm = new FormGroup({
    idFilter: new FormControl(''),
    nameFilter: new FormControl(''),
    priceFilter: new FormControl(''),
    stockFilter: new FormControl(''),
    categoryFilter: new FormControl('')
  });
  allColumnsFilter = new FormControl('');

  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, private dialog: MatDialog,  private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.loadProducts();
    this.setupFilters();
  }
  loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
    
      this.dataSource.data = products;
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
  addProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: { isEdit: true, product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      const searchTerm = filter.trim().toLowerCase();
      return (
        String(data.id).toLowerCase().includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm) ||
        String(data.price).toLowerCase().includes(searchTerm) ||
        String(data.stock).toLowerCase().includes(searchTerm) ||
        String(data.categoryId).toLowerCase().includes(searchTerm)
      );
    };
  }
  printTable() {
    window.print();
  }
  
  exportTable() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Name,Price,Stock\n";
  
    this.dataSource.data.forEach((row) => {
      csvContent += `${row.id},${row.name},${row.price},${row.stock}\n`;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
  }
}
