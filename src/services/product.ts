import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getImage = (images: string[]): string => {
  if (Array.isArray(images) && images.length > 0) {
    const cleanedImages = images[0].replace('[', '').replace(']', '').replace(/"/g, '').split(',');
    return cleanedImages[0];
  }
  return 'https://via.placeholder.com/200';
};


export const createProduct = async (payload: any) => { // Accept payload as a parameter
  try {
    const response = await axios.post('https://api.escuelajs.co/api/v1/products', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};