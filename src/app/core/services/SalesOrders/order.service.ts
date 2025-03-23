import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderHeader } from '../../models/SalesOrders/OrderHeader';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = `${environment.baseUrl}Order`;
  constructor(private http: HttpClient) { }

  getOrders(): Observable<OrderHeader[]> {
    return this.http.get<OrderHeader[]>(this.baseUrl);
  }
  getOrderById(orderId: number): Observable<OrderHeader> {
    return this.http.get<OrderHeader>(`${this.baseUrl}/${orderId}`);
  }
  createOrder(order: OrderHeader): Observable<OrderHeader> {
    return this.http.post<OrderHeader>(this.baseUrl, order);
  }
  updateOrder(order: OrderHeader): Observable<OrderHeader> {
    return this.http.put<OrderHeader>(`${this.baseUrl}/${order.id}`, order);
  }
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}`);
  }
}
