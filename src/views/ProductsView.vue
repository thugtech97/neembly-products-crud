<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchProducts, deleteProduct, Product } from '@/services/product';
import ProductCard from '@/components/ProductCard.vue';
import NoRecords from '@/components/NoRecords.vue';

let products = ref<Product[]>([]);
let loading = ref(true);

let fetch = async () => {
  try {
    loading.value = true;
    products.value = await fetchProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
}

let handleDeleteProduct = async (id: number) => {
  try {
    await deleteProduct(id);
    fetch();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

onMounted(async () => {
  fetch();
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
          <template v-if="products.length === 0">
            <NoRecords />
          </template>
          <template v-else>
            <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
              <ProductCard :product="product" @delete-product="handleDeleteProduct" />
            </v-col>
          </template>
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
