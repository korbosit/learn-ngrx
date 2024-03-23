import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { AppState } from './states/app.state';
import { selectCount } from './states/counter/counter.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductsComponent } from './products/products.component';
import { IProduct } from './shared/models/product.interface';
import { selectCartProducts } from './states/cart/cart.selector';
import { removeItem } from './states/cart/cart.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    CounterComponent,
    ProductsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'learn-ngrx';

  count$: Observable<number>;
  products$: Observable<IProduct[]>;

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
    this.products$ = this.store.select(selectCartProducts);
  }
}
