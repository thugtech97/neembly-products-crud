<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchProducts, Product } from '@/services/product';
import ProductCard from '@/components/ProductCard.vue';

const products = ref<Product[]>([]);
const loading = ref(true); // Track loading state

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false; // Set loading to false after fetching
  }
});
</script>

<template>
  <div>
    <h1>Products ({{ products.length }})</h1>
    <v-container>
      <v-row>
        <template v-if="loading">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p>Loading products...</p>
          </v-col>
        </template>
        <template v-else>
          <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
            <ProductCard :product="product" />
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}
</style>
