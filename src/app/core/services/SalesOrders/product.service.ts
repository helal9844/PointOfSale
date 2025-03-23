import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.baseUrl}Product`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?categoryId=${categoryId}`);
  }
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, product);
  }
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
