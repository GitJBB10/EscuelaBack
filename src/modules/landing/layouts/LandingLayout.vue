<template>
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <header class="flex items-center h-14 px-4 border-b border-gray-300 sm:h-16 md:px-6 lg:px-8">
        <div>
          <a class="flex items-center gap-2 font-semibold" href="#">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
          </a>
        </div>
        <div><p class="nombreEscuela"> Escuela Particular Despertar Ecuatoriano </p></div>
        <nav class="ml-auto space-x-4 flex items-center h-10 sm:space-x-6">
          <p class="mr-4 nombreUsuario"> Bienvenido {{ userName }}</p>
          <RouterLink @click="logout"  to="/"> Logout </RouterLink>
        </nav>
      </header>
      <!-- Fin Header -->
  
      <!-- Main -->
      <main class="flex flex-1">
        <div class="left border-r border-gray-300">
          <SideBar />  
        </div>
  
        <div class="rigth">
          <RouterView />  
        </div>
  
        <div class="flex-1 flex items-center justify-center py-6">
           
        </div>
      </main>
      <!-- Fin Main -->
  
      <!-- Footer -->
      <footer class="flex items-center h-14 px-4 border-t border-gray-300 sm:h-16 md:px-6 lg:px-8">
        <p class="flex-1 text-sm text-gray-500 text-center">
          © {{ new Date().getFullYear() }} Acme Corporation. Derechos reservados
        </p>
      </footer>
      <!-- Fin Footer -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import SideBar from '@/modules/SideBar.vue'
  //import { Mail } from 'lucide-vue-next';
  import { useRouter } from 'vue-router';

  // Obtener el nombre del usuario desde el localStorage
  const userName = localStorage.getItem('userName') || 'Usuario';

  const router = useRouter();

  const logout = () => {
  // Eliminar el token de autenticación del almacenamiento local
  localStorage.removeItem('token');

  // Eliminar cualquier otra información del usuario
  localStorage.removeItem('user');
  localStorage.removeItem('permissions');

  // Redirigir al usuario a la página de inicio de sesión
  router.push('/login');
  };
  </script>
  
  <style scoped>
    .right {
    background-color: #9e5757;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nombreUsuario{
    color: cadetblue;
  }

  .nombreEscuela{
    font-weight: 900;
  }

  </style>
  