<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Chat Application
        </q-toolbar-title>
        <div v-if="authStore.isAuthenticated">
          Welcome, {{ authStore.user?.username || 'User' }}
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from '../modules/auth/store/auth-store';

const authStore = useAuthStore();
</script>
