import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProductsView from '@/views/ProductsView.vue';
import CreateProduct from '@/views/CreateProduct.vue';
import ProductView from '@/views/ProductView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/products/:id',
      name: 'viewProduct',
      component: ProductView,
      props: true
    },
    {
      path: '/create',
      name: 'create',
      component: CreateProduct
    }
  ]
});

export default router;
