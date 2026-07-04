export type GalleryImage = {
  id: string;
  src: string;      // URL
  alt: string;
  category?: 'food' | 'restaurant' | 'event';
};