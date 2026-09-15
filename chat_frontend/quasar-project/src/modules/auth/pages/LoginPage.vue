<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold">Welcome Back</div>
        <div class="text-grey-7">Sign in to your account</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" filled label="Email" type="email" class="q-mb-md" />
        <q-input v-model="password" filled label="Password" type="password" class="q-mb-md" />
        
        <q-btn 
          color="primary" 
          label="Login" 
          class="full-width" 
          @click="handleLogin" 
          :loading="loading" 
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useAuthStore } from '../store/auth-store';
import { useRouter } from 'vue-router';

// 1. Setup Variables
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

// 2. Define the GraphQL Mutation (Exactly like you tested in the playground!)
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      accessToken
      user {
        id
        username
      }
    }
  }
`;

// 3. Connect Apollo
const { mutate: loginMutation, loading } = useMutation(LOGIN_MUTATION);

// 4. The function that runs when you click Login
async function handleLogin() {
  try {
    // Send request to backend
    const response = await loginMutation({ email: email.value, password: password.value });
    
    // Grab the token and user from the response
    const data = response?.data?.login;
    
    // Save it in our Pinia Store!
    authStore.loginSuccess(data.accessToken, data.user);
    
    alert('Login successful!');
    
    // Redirect to the home page
    void router.push('/');
    
  } catch (error) {
    alert('Failed to login. Please check credentials.');
    console.error(error);
  }
}
</script>

<style scoped>
.my_card {
  width: 100%;
  max-width: 400px;
}
</style>
