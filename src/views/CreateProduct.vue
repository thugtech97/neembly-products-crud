<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCategories, type Category } from '@/services/category';
import { createProduct } from '@/services/product';

let form:any = reactive({
  productTitle: '',
  price: '',
  description: '',
  category: '',
  imageUrl: '',
  categories: []
});

const router = useRouter();
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('success');

const required = (value: string) => !!value || 'This field is required';
const priceValidation = (value: number) =>
  value !== null && value > 0 || 'Price must be greater than zero';

const vFormRef: any = ref(null);

let resetForm = () => {
  form.productTitle = '';
  form.price = '';
  form.description = '';
  form.category = '';
  form.imageUrl = '';
};

const submitProduct = async () => {
  const isValid = await vFormRef.value.validate();
  if (isValid.valid) {
    const payload = {
      title: form.productTitle,
      price: parseFloat(form.price),
      description: form.description,
      categoryId: form.category,
      images: [form.imageUrl]
    };

    try {
        const response = await createProduct(payload);
        snackbarMessage.value = 'Product inserted successfully!';
        snackbarColor.value = 'success';
        snackbar.value = true;
        setTimeout(() => {
          router.push('/products');
        }, 2000);
    } catch (error: any) {
        snackbarMessage.value = error.response?.data?.message || 'An error occurred while inserting the product.';
        snackbarColor.value = 'error';
        snackbar.value = true;
        console.error('Error inserting product:', error.response?.data || error.message);
    }

  } else {
    console.log('Form is invalid.');
  }
};

onMounted(async () => {
  try {
    form.categories = await fetchCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});
</script>

<template>
  <v-container>
    <h1>Create a Product</h1>
    <v-form ref="vFormRef" class="mt-5" @submit.prevent="submitProduct">
      <v-text-field
        v-model="form.productTitle"
        label="Product Title"
        :rules="[required]"
        required
        variant="outlined"
        class="mt-4"
      ></v-text-field>

      <v-text-field
        v-model="form.price"
        label="Price"
        type="number"
        :rules="[required, priceValidation]"
        required
        variant="outlined"
        class="mt-4"
      ></v-text-field>

      <v-textarea
        v-model="form.description"
        label="Description"
        rows="5"
        :rules="[required]"
        required
        variant="outlined"
        class="mt-4"
      ></v-textarea>

      <v-select
        v-model="form.category"
        :items="form.categories"
        item-title="name"
        item-value="id"
        label="Category"
        :rules="[required]"
        variant="outlined"
        class="mt-4"
        required
      ></v-select>

      <v-text-field
        v-model="form.imageUrl"
        label="Paste Image URL"
        placeholder="Enter the image link"
        variant="outlined"
        :rules="[required]"
        class="mt-4"
      ></v-text-field>

      <v-img
        v-if="form.imageUrl"
        :src="form.imageUrl"
        alt="Product image preview"
        max-height="200"
        class="mt-3"
      ></v-img>

      <v-row class="mt-4 mb-4 float-right">
        <v-btn color="secondary" @click="resetForm">Reset</v-btn>
        <v-btn color="primary" class="ml-2" @click="submitProduct">Submit</v-btn>
      </v-row>
    </v-form>
    
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarMessage }}
      <template v-slot:actions="{ isActive }">
        <v-btn text="true" v-bind="isActive" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.v-img {
  max-width: 100%;
  object-fit: contain;
}
</style>
