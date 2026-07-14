import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number; // Storing as a number makes calculating the total easier!
  size: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  cartTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isCartOpen: false,
  
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  
  addItem: (item) => set((state) => {
    // Check if this exact item (same ID and size) is already in the cart
    const existingItem = state.items.find(i => i.id === item.id && i.size === item.size);
    
    if (existingItem) {
      // If it is, just increase the quantity
      return {
        items: state.items.map(i => 
          i.id === item.id && i.size === item.size 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        ),
        isCartOpen: true // Automatically slide the cart open when they add something!
      };
    }
    
    // If it's a new item, add it to the array
    return { items: [...state.items, item], isCartOpen: true };
  }),

  removeItem: (id, size) => set((state) => ({
    items: state.items.filter(i => !(i.id === id && i.size === size))
  })),

  updateQuantity: (id, size, quantity) => set((state) => ({
    items: state.items.map(i => 
      i.id === id && i.size === size ? { ...i, quantity: Math.max(1, quantity) } : i
    )
  })),

  cartTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));