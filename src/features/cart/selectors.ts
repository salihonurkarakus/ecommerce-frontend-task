import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCount = createSelector(selectCartItems, (items) =>
  items.reduce((s, i) => s + i.qty, 0)
);
export const selectSubtotal = createSelector(selectCartItems, (items) =>
  items.reduce((s, i) => s + i.price * i.qty, 0)
);
