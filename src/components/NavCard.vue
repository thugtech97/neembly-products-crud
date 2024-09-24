<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router'
import { VCard, VCardTitle, VCardActions, VBtn } from 'vuetify/components'

const props = defineProps<{
    link: string;
    icon: string;
    buttonText: string;
}>();
</script>

<template>
    <div>
        <RouterLink :to="link" class="card-link">
            <VCard class="card">
                <VCardTitle class="card-title">
                    <i :class="icon + ' card-icon'"></i>
                </VCardTitle>
                <VCardActions class="card-actions">
                    <VBtn text class="card-button">{{ buttonText }}</VBtn>
                </VCardActions>
            </VCard>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.card-link {
    text-decoration: none;
    color: inherit;

    .card {
        margin: 0 10px;
        width: 300px;
        transition: transform 0.3s, box-shadow 0.3s;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
        }

        .card-title {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            color: #3f51b5;
            margin-bottom: 10px;
        }

        .card-icon {
            margin-right: 5px;
            font-size: 1.5em;
        }

        .card-actions {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        .card-button {
            color: #3f51b5;
        }
    }
}
</style>