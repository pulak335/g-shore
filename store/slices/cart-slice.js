import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  originalTotal: 0,
  totalSavings: 0,
  promoCode: null,
  promoDiscount: 0,
  promoDiscountAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Calculate totals with discount support
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.originalTotal = state.items.reduce((sum, item) => {
        const originalPrice = item.originalPrice || item.price;
        return sum + (originalPrice * item.quantity);
      }, 0);
      state.totalSavings = state.originalTotal - state.total;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Recalculate totals
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.originalTotal = state.items.reduce((sum, item) => {
        const originalPrice = item.originalPrice || item.price;
        return sum + (originalPrice * item.quantity);
      }, 0);
      state.totalSavings = state.originalTotal - state.total;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
      
      // Recalculate totals
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.originalTotal = state.items.reduce((sum, item) => {
        const originalPrice = item.originalPrice || item.price;
        return sum + (originalPrice * item.quantity);
      }, 0);
      state.totalSavings = state.originalTotal - state.total;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.originalTotal = 0;
      state.totalSavings = 0;
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCartError: (state, action) => {
      state.error = action.payload;
    },
    clearCartError: (state) => {
      state.error = null;
    },
    applyPromoCode: (state, action) => {
      const { code, discount, discountAmount } = action.payload;
      state.promoCode = code;
      state.promoDiscount = discount;
      state.promoDiscountAmount = discountAmount;
      
      // Recalculate total with promo discount
      const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.total = Math.max(0, subtotal - discountAmount);
    },
    removePromoCode: (state) => {
      state.promoCode = null;
      state.promoDiscount = 0;
      state.promoDiscountAmount = 0;
      
      // Recalculate total without promo discount
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartLoading,
  setCartError,
  clearCartError,
  applyPromoCode,
  removePromoCode,
} = cartSlice.actions;

export default cartSlice.reducer;
