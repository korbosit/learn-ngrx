import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { IProduct } from '../shared/models/product.interface';
import { ProductApiService } from '../shared/services/product-api.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../states/cart/cart.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  http = inject(HttpClient);
  productApi = inject(ProductApiService);
  products$ = this.productApi.getProducts() as Observable<IProduct[]>;

  constructor(private store: Store<{ cart: { products: IProduct[] } }>) {}

  ngOnInit(): void {
    // this.http.get('https://fakestoreapi.com/products').subscribe((res) => {
    //   console.log(res);
    // });
    // this.productApi.getProducts().subscribe((res) => {
    //   console.log(res);
    // });
  }

  addItemToCart(product: IProduct) {
    this.store.dispatch(addToCart({ product }));
  }
}
