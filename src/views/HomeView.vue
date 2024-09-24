<script setup lang="ts">
import NavCard from '@/components/NavCard.vue';
</script>

<template>
  <main class="main-content">
    <h1 class="title">Welcome to THUGTECH Products!</h1>
    <p class="description">
      Discover a wide range of innovative products designed to enhance your lifestyle. Our commitment to quality and customer satisfaction ensures that you'll find exactly what you need to meet your needs. Explore our catalog today and experience the THUGTECH difference!
    </p>

    <div class="card-container">
      <NavCard link="/products" icon="fas fa-eye" buttonText="View Products"/>
      <NavCard link="/create" icon="fas fa-plus" buttonText="Create a Product"/>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main-content {
  text-align: center;
  padding: 50px;
  background-color: white;
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 

  .title {
    font-size: 2.5em; 
    color: #3f51b5;
    margin-bottom: 50px;
  }

  .description {
    font-size: 1.2em;
    color: #555;
    line-height: 1.5;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  .card-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
