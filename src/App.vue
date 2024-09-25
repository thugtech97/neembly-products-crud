<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { VApp, VAppBar, VToolbarTitle, VNavigationDrawer, VMain, VList, VListItem, VContainer, VRow, VCol, VBtn, VSpacer } from 'vuetify/components'
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
    <img src="@/assets/img/THUGTECH.png" alt="Thugtech Mart" class="brand-logo" />
    <v-spacer></v-spacer>
    <v-btn icon>
      <img src="@/assets/img/algoexpert.png" alt="Account" class="circular-image" />
    </v-btn>
  </v-app-bar>

    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item>
          <RouterLink to="/" class="v-btn link" active-class="active-link" exact-active-class="active-link">Home</RouterLink>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/products" class="v-btn link" active-class="active-link" exact-active-class="active-link">Products</RouterLink>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/create" class="v-btn link" active-class="active-link" exact-active-class="active-link">Create</RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
          <RouterView />
      </v-container>
    </v-main>
    <v-footer app color="accent">
        <v-container>
            <span>&copy; Thugtech Products</span>
        </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped lang="scss">

.brand-logo {
  height: 100%;
  width: 255px;
}

.circular-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.v-navigation-drawer {
  background-color: rgb(255, 246, 246);
  .link {
    color: grey;
  }
  .active-link {
    color: #3f51b5;
  }
}

.v-main {
  background-color: #f5f5f5;
}
</style>
