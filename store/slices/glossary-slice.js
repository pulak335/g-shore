import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  categories: [],
  filteredItems: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
  error: null,
  currentItem: null,
};

const glossarySlice = createSlice({
  name: 'glossary',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setItems: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload) {
        state.filteredItems = state.items.filter(item => item.category === action.payload);
      } else {
        state.filteredItems = state.items;
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      if (query) {
        state.filteredItems = state.items.filter(item => 
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      } else {
        state.filteredItems = state.items;
      }
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.filteredItems = state.items;
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.filteredItems = state.items;
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.filteredItems = state.items;
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.searchQuery = '';
      state.filteredItems = state.items;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setItems,
  setCategories,
  setSelectedCategory,
  setSearchQuery,
  setCurrentItem,
  addItem,
  updateItem,
  deleteItem,
  clearFilters,
} = glossarySlice.actions;

export default glossarySlice.reducer;
