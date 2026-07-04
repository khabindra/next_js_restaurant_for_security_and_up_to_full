export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string; // URL
  category: 'starter' | 'main' | 'dessert' | 'drink';
};

export type MenuCategory = 'starter' | 'main' | 'dessert' | 'drink';