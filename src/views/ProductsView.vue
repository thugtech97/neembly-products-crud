<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchProducts, Product } from '@/services/product';
import ProductCard from '@/components/ProductCard.vue';


const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
</script>

<template>
  <div>
    <h1>Products ({{ products.length }})</h1>
    <v-container>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
          <ProductCard :product="product"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>