<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import { getImage } from '@/services/product';

const props = defineProps<{
    product: any;
}>();

const router = useRouter(); // Initialize router

const expandedDescriptions = ref<{ [key: number]: boolean }>({});

const isDescriptionExpanded = (id: number) => {
  return expandedDescriptions.value[id] || false;
};

const toggleDescription = (id: number) => {
  expandedDescriptions.value[id] = !isDescriptionExpanded(id);
};

const truncatedDescription = (description: string) => {
  return description.length > 150 ? description.slice(0, 150) : description;
};

const navigateToProductView = () => {
  router.push({ path: `/products/${props.product.id}` });
};

</script>

<template>
    <div>
        <v-card class="pa-3" @click="navigateToProductView">
            <div class="image-container">
                <img 
                    :src="getImage(product.images)" 
                    @error="(e) => e.target.src='https://via.placeholder.com/200'" 
                    alt="Product image" 
                    height="200px" 
                    class="rounded"
                >
            </div>
            <v-card-title>{{ product.title }}</v-card-title>
            <v-card-subtitle>Price: ₱{{ product.price }}</v-card-subtitle>
            <v-card-text>
                <span v-if="!isDescriptionExpanded(product.id)">
                    {{ truncatedDescription(product.description) }}
                    <span v-if="product.description.length > 150">
                    ... <a href="#" @click.prevent="toggleDescription(product.id)">See more</a>
                    </span>
                </span>
                <span v-else>
                    {{ product.description }} 
                    <a href="#" @click.prevent="toggleDescription(product.id)">See less</a>
                </span>
            </v-card-text>
          </v-card>
    </div>
</template>

<style lang="scss" scoped>
.v-card {
  border-radius: 10px;

  .image-container {
        display: flex;
        justify-content: center; 
        align-items: center; 
        height: 200px;
        
        .rounded {
            justify-content: center;
            border-radius: 10px;
            overflow: hidden;
        }
    }
}
</style>