import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<Omit<CartItem, "qty"> & { qty?: number }>
    ) => {
      const { id, title, price, image, qty = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) existing.qty += qty;
      else state.items.push({ id, title, price, image, qty });
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    increment: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.qty += 1;
    },
    decrement: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && item.qty > 1) item.qty -= 1;
    },
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increment, decrement, clear, setItems } =
  cartSlice.actions;
export type { CartItem };
export default cartSlice.reducer;
