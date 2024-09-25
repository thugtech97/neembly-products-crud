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
  } catch (error: any) {
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


export const getProduct = async (id: any) => {
  try{
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
    return response.data
  }catch(error){
    throw error;
  }
};

export const createProduct = async (payload: any) => {
  try {
    const response = await axios.post('https://api.escuelajs.co/api/v1/products', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id: number, payload: any) => {
  try {
    const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, payload);
    return response.data;
  } catch (error: any) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error;
  }
};