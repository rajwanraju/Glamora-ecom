import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartType {
  cartItems: CartItem[];
}

const initialState: CartType = {
  cartItems: [],
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Omit<CartItem, 'quantity'>; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; delta: number }>) => {
      const { id, delta } = action.payload;
      const existing = state.cartItems.find((item) => item.id === id);
      if (existing) {
        existing.quantity += delta;
        if (existing.quantity <= 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
