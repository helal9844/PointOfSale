import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/SalesOrders/Product';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from 'src/app/core/services/SalesOrders/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/core/services/swal.service';
import { CategoryService } from 'src/app/core/services/SalesOrders/category.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  products: any[] = [];
  categories: any[] = [];
  filteredCategories!: Observable<any[]>;
  filteredProducts!: Observable<any[]>;
  productForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: this.data.isEdit }),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    categoryId: new FormControl(1, Validators.required)
  });
  categorySearchControl = new FormControl('');
  
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, product?: any },
    private productService: ProductService,
    private categoryService: CategoryService,
    private swal:SwalService
  ) {

  }
  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();

    if (this.data.isEdit && this.data.product) {
      this.productForm.patchValue(this.data.product);
    }
    this.filteredCategories = this.categorySearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || ''))
    );
    this.filteredProducts = this.productForm.controls['name'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterProducts(value || ''))
    );
  }
  private _filterCategories(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  }
  private loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  selectCategory(categoryName: string) {
    const selectedCategory = this.categories.find(c => c.name === categoryName);
  if (selectedCategory) {
    this.productForm.controls['categoryId'].setValue(selectedCategory.id); // Store ID in form
    this.categorySearchControl.setValue(selectedCategory.name); // Show Name in input
  }
  }
  selectProduct(productId: number) {
    this.productForm.controls['name'].setValue(productId);
  }
  private _filterProducts(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }
  private loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }
  saveProduct() {
    if (this.productForm.valid) {
      const product = this.productForm.getRawValue();
      if (this.data.isEdit) {
        this.productService.updateProduct(product.id, product).subscribe(() => 
          {
            this.dialogRef.close(true);
            this.swal.success('Product Updated Successfully!');
          });
      } else {
        this.productService.addProduct(product).subscribe(() => 
          {
            this.dialogRef.close(true);
            this.swal.success('Product Added Successfully!');
          });
      }
    }
  }
}
