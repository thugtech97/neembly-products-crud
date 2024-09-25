import axios from 'axios';

export interface Category {
  id: number;
  name: string;
  image: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};