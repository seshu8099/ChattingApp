<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg shadow-2 text-center my_card" bordered>
      <q-card-section>
        <div class="text-h4 text-weight-bold q-mb-md">Chat Room</div>
        <div class="text-subtitle1 text-grey-7 q-mb-xl">
          Welcome to the application! You are securely logged in.
        </div>
        <q-btn 
          color="negative" 
          icon="logout" 
          label="Logout" 
          @click="handleLogout" 
          class="full-width" 
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../auth/store/auth-store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

function handleLogout() {
  authStore.logout();
  void router.push('/login');
}
</script>

<style scoped>
.my_card {
  width: 100%;
  max-width: 500px;
}
</style>
