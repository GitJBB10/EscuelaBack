<template>
  <!-- component -->
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="@/images/img-fondo-login.jpg" alt="Placeholder Image" class="object-cover w-full h-full">
    </div>
    <!-- Right: Login Form -->
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4">Inicio de Sesion</h1>
      <form @submit.prevent="login">
        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Email</label>
          <input type="email" id="email" v-model="email" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
        </div>
        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password</label>
          <input type="password" id="password" v-model="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
        </div>
        <!-- Remember Me Checkbox -->
        <div class="mb-4 flex items-center">
          <input type="checkbox" id="remember" v-model="remember" class="text-blue-500">
          <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
        </div>
        <!-- Forgot Password Link -->
        <div class="mb-6 text-blue-500">
          <a href="#" class="hover:underline">Forgot Password?</a>
        </div>
        <!-- Login Button -->
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from '@/plugins/axios';
import router from '@/router'; // Asume que tienes configurado Vue Router

const email = ref('');
const password = ref('');
const remember = ref(false); // Definir la propiedad remember

const login = async () => {
  try {
    const response = await axios.post('/login', {
      email: email.value,
      password: password.value,
      remember: remember.value
    });

    // Guardar el token en el almacenamiento local (localStorage)
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('permissions', JSON.stringify(response.data.user.permissions));
    localStorage.setItem('roles', JSON.stringify(response.data.user.roles));
    localStorage.setItem('userName', response.data.user.name); // Guardar nombre del usuario

    // Redirigir al usuario a la página principal u otra página protegida
    router.push('/');
  } catch (error:any) {
    console.error('Error en el inicio de sesión:', error);

    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      alert(`Error: ${error.response.data.message || 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'}`);
    } else {
      alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    }
  }
};
</script>
