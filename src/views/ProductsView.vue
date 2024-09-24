<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchProducts, getImage, Product } from '@/services/product';

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
    <h1>Products</h1>
    <v-container>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
          <v-card class="pa-3">
            <img :src="getImage(product.images)" @error="(e) => e.target.src='https://via.placeholder.com/200'" alt="Product image" height="200px" class="rounded">
            <v-card-title>{{ product.title }}</v-card-title>
            <v-card-subtitle>Price: ₱{{ product.price }}</v-card-subtitle>
            <v-card-text>{{ product.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.v-card {
  border-radius: 10px;
}

.rounded {
  border-radius: 10px;
  overflow: hidden;
}
</style>
