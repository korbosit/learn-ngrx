import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../shared/models/product.interface';
import { addToCart, incrementProduct } from './cart.actions';
import * as CartActions from './cart.actions';

export interface CartState {
  products: IProduct[];
  totalPrice: number;
}

export const initialCounterState: CartState = {
  products: [],
  totalPrice: 0,
};

export function calculateTotalPrice(products: IProduct[]) {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}

export const cartReducer = createReducer(
  initialCounterState,
  on(CartActions.addToCart, (state, { product }) => {
    const updateProduct = [...state.products, product];
    return {
      ...state,
      products: updateProduct,
      totalPrice: calculateTotalPrice(updateProduct),
    };
  }),
  on(CartActions.removeItem, (state, { productId }) => {
    const updateProduct = state.products.filter(
      (product) => product.id !== productId
    );
    return {
      ...state,
      products: updateProduct,
      totalPrice: calculateTotalPrice(updateProduct),
    };
  }),
  on(CartActions.incrementProduct, (state, { productId }) => {
    const updatedProducts = state.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    return {
      ...state,
      products: updatedProducts,
      totalPrice: calculateTotalPrice(updatedProducts),
    };
  }),
  on(CartActions.decrementProduct, (state, { productId }) => {
    const updatedProducts = state.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    return {
      ...state,
      products: updatedProducts,
      totalPrice: calculateTotalPrice(updatedProducts),
    };
  })
);
