<script setup lang="ts">
import { defineProps, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { getProduct, updateProduct } from '@/services/product';

const props = defineProps<{
    id: string;
}>();

const form = reactive({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
});

const router = useRouter();
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('success');

const vFormRef = ref(null);
const loading = ref(true);
const error = ref('');

const required = (value: string) => !!value || 'This field is required';
const priceValidation = (value: number) =>
  value !== null && value > 0 || 'Price must be greater than zero';

onMounted(async () => {
    try {
        const product = await getProduct(props.id);
        Object.assign(form, {
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category.name,
            image: product.images[0].replace('[', '').replace(']', '').replace(/"/g, '')
        });
    } catch (err) {
        error.value = 'Error fetching product: ' + (err.response?.data || err.message);
        console.error(err);
    } finally {
        loading.value = false;
    }
});

const saveChanges = async () => {
    try {
        const payload = {
            title: form.title,
            price: form.price,
            description: form.description,
            images: [form.image]
        };
        const updatedProduct = await updateProduct(props.id, payload);
        console.log('Product updated successfully:', updatedProduct);
        snackbarMessage.value = 'Product updated successfully!';
        snackbarColor.value = 'success';
        snackbar.value = true;
        setTimeout(() => {
          router.push('/products');
        }, 2000);
    } catch (error) {
        snackbarMessage.value = error.response?.data?.message || 'An error occurred while updating the product.';
        snackbarColor.value = 'error';
        snackbar.value = true;
        console.error('Failed to update product:', error);
    }
};
</script>

<template>
    <v-container>
        <h1>Product Details</h1>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-form ref="vFormRef" class="mt-5" v-if="!loading">
            <v-text-field
                v-model="form.title"
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

            <v-text-field
                v-model="form.category"
                label="Category"
                placeholder="Category"
                variant="outlined"
                disabled
                class="mt-4"
            ></v-text-field>

            <v-text-field
                v-model="form.image"
                label="Paste Image URL"
                placeholder="Enter the image link"
                variant="outlined"
                :rules="[required]"
                class="mt-4"
            ></v-text-field>

            <div class="image-container mt-3">
                <img
                    v-if="form.image"
                    :src="form.image"
                    @error="(e) => e.target.src='https://via.placeholder.com/200'"
                    alt="Product image preview"
                    class="centered-image"
                />
            </div>

            <v-row class="mt-4 mb-4 float-right">
                <v-btn color="primary" class="ml-2" @click="saveChanges">Save changes</v-btn>
            </v-row>
        </v-form>
        <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
            {{ snackbarMessage }}
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
        <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    </v-container>
</template>

<style scoped lang="scss">
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .centered-image {
        max-height: 200px;
        width: auto;
        object-fit: contain;
    }
}
</style>
