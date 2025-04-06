import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/SalesOrders/category.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  filteredCategories!: Observable<any[]>;

  categoryForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: this.data.isEdit }),
    name: new FormControl('', Validators.required),

  });
  categorySearchControl = new FormControl('');
  
  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, category?: any },
    private categoryService: CategoryService,
    private swal:SwalService
  ) {

  }
  ngOnInit(): void {
    this.loadCategories();


    if (this.data.isEdit && this.data.category) {
      this.categoryForm.patchValue(this.data.category);
    }
    this.filteredCategories = this.categorySearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || ''))
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
    this.categoryForm.controls['id'].setValue(selectedCategory.id); 
    this.categorySearchControl.setValue(selectedCategory.name);
  }
  }
  saveCategory() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.getRawValue();
      if (this.data.isEdit) {
        this.categoryService.updateCategory(category.id, category).subscribe(() => 
          {
            this.dialogRef.close(true);
            this.swal.success('Category Updated Successfully!');
          });
      } else {
        this.categoryService.createCategory(category).subscribe(() => 
          {
            this.dialogRef.close(true);
            this.swal.success('Category Added Successfully!');
          });
      }
    }
  }
}
