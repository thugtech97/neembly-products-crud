<script setup lang="ts">

import { useRouter } from 'vue-router';

let router = useRouter();

</script>

<template>
    <div class="empty-section-container">
        <img src="@/assets/img/empty-box.png" alt="" style="width: 200px">
        <h3 class="mt-2" style="text-align:center">No Products found!</h3>
        <small class="mb-3">Click <a href="javascript::void" @click="router.push('/create')">here</a> to create one.</small>
    </div>
</template>

<style lang="scss" scoped>
.empty-section-container{
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>