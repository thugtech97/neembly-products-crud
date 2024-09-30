<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getImage } from '@/services/product';

const props = defineProps<{
    product: any;
}>();

const router = useRouter();
const emit = defineEmits(['delete-product']);

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


const deleteProduct = () => {
    emit('delete-product', props.product.id);
};
</script>

<template>
  <div>
    <v-card class="pa-3" @click="navigateToProductView">
      <div class="image-container">
        <img 
          :src="getImage(product.images)" 
          @error="(e: any) => e.target.src='https://via.placeholder.com/200'" 
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
      
      <!-- Card Actions -->
      <v-card-actions class="justify-end">
        <button @click.stop="deleteProduct" type="button" class="btn btn-xs">
          <i class="fa fa-trash"></i>
        </button>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.v-card {
  border-radius: 10px;
  position: relative;

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

  .delete-icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
    cursor: pointer;
  }
}
</style>