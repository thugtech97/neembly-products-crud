<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { fetchProducts, deleteProduct, Product } from '@/services/product';
import { fetchCategories, Category } from '@/services/category';
import ProductCard from '@/components/ProductCard.vue';
import NoRecords from '@/components/NoRecords.vue';

let products = ref<Product[]>([]);
let loading = ref(true);

let snackbar = ref(false);
let snackbarMessage = ref('');
let snackbarColor = ref('success');

let searchQuery = ref('');
let minPrice = ref<number | null>(null);
let maxPrice = ref<number | null>(null);
let selectedCategory = ref<string | null>(null);

let categories = ref<Category[]>([]);

let fetchItems = async () => {
  try {
    loading.value = true;
    products.value = await fetchProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

let fetchTypes = async () => {
  try {
    categories.value = await fetchCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

let handleDeleteProduct = async (id: number) => {
  try {
    await deleteProduct(id);
    snackbarMessage.value = 'Product deleted!';
    snackbarColor.value = 'success';
    snackbar.value = true;
    fetchItems();
  } catch (error) {
    snackbarMessage.value = error.response?.data?.message || 'Error: ' + error;
    snackbarColor.value = 'error';
    snackbar.value = true;
    console.error('Error deleting product:', error);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesTitleDescription =
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesPrice =
      (!minPrice.value || product.price >= minPrice.value) &&
      (!maxPrice.value || product.price <= maxPrice.value);

    const matchesCategory =
      !selectedCategory.value || product.category.id === selectedCategory.value;

    return matchesTitleDescription && matchesPrice && matchesCategory;
  });
});

const resetFilters = () => {
  searchQuery.value = '';
  minPrice.value = null;
  maxPrice.value = null;
  selectedCategory.value = null;
};

onMounted(async () => {
  fetchItems();
  fetchTypes();
});
</script>

<template>
  <div>
    <h1>Products ({{ filteredProducts.length }})</h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            variant="outlined"
            v-model="searchQuery"
            label="Search by Title/Description"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="6" md="2">
          <v-text-field
            variant="outlined"
            v-model="minPrice"
            label="Min Price"
            type="number"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            variant="outlined"
            v-model="maxPrice"
            label="Max Price"
            type="number"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            variant="outlined"
            v-model="selectedCategory"
            :items="categories"
            item-title="name"
            item-value="id"
            label="Category"
            clearable
          ></v-select>
        </v-col>
        <v-col cols="12" md="1" class="d-flex">
          <v-btn color="primary" @click="resetFilters">Reset</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <template v-if="loading">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p>Loading products...</p>
          </v-col>
        </template>

        <template v-else>
          <template v-if="filteredProducts.length === 0">
            <NoRecords />
          </template>
          <template v-else>
            <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
              <ProductCard :product="product" @delete-product="handleDeleteProduct" />
            </v-col>
          </template>
        </template>
      </v-row>
      <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
        {{ snackbarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}
</style>
