<template>
  <div class="assign-roles-container">
    
    <h2 class="titulo">Asignar Roles a Usuarios</h2>

    <div class="search-box">
      <label class="label1" for="user-search">Buscar Usuario:</label>
      <input class="input-buscar" v-model="searchQuery" id="user-search" placeholder="Buscar usuario..." />
      <button @click="buscarUsuario" class="btn btn-primary">Buscar</button>
    </div>

    <div v-if="usuarioEncontrado" class="role-assignment">
      <div class="user-info">
        <h3>Usuario: {{ usuarioEncontrado.name }}</h3>
      </div>

      <div class="role-list">
        <h3>Roles Disponibles</h3>

        <div class="roles-list">
          <div v-for="role in roles" :key="role.id" class="role-item">
            <label >
              <input type="checkbox" :value="role.id" v-model="selectedRoles" />
              {{ role.name }}
            </label>
          </div>
        </div>

      </div>

      <button @click="assignRoles" class="btn btn-primary">Asignar Roles</button>
    </div>

    <div v-else-if="userNotFound" class="no-user">
      <p>Usuario no encontrado. Intenta con otro nombre.</p>
    </div>
  </div>
</template>

  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '@/plugins/axios';

interface User {
  id: number;
  name: string;
  roles?: Role[];
}

interface Role {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'AsignarRoles',
  setup() {
    const searchQuery = ref<string>('');
    const usuarioEncontrado = ref<User | null>(null);
    const userNotFound = ref<boolean>(false);
    const roles = ref<Role[]>([]);
    const selectedRoles = ref<number[]>([]);

    const fetchRoles = async () => {
      try {
        const response = await axios.get('/role');
        roles.value = response.data;
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

   const buscarUsuario = async () => {
   try {
    const response = await axios.get('/user/filter', {
      params: {
        search: searchQuery.value,
      },
    });

    if (response.data && response.data.length > 0) {
      usuarioEncontrado.value = response.data[0]; // Asignar el primer usuario encontrado
      userNotFound.value = false;

      // Obtener los roles del usuario y marcar los roles asignados
      selectedRoles.value = usuarioEncontrado.value?.roles?.map((role: any) => role.id) || [];

    } else {
      usuarioEncontrado.value = null;
      userNotFound.value = true;
    }
  } catch (error) {
    console.error('Error buscando usuario:', error);
    usuarioEncontrado.value = null;
    userNotFound.value = true;
  }
  };


    const assignRoles = async () => {
      if (!usuarioEncontrado.value) {
        alert('No hay usuario seleccionado');
        return;
      }


      try {
        await axios.post(`/user/${usuarioEncontrado.value.id}/roles`, {
          roles: selectedRoles.value,
        });
        alert('Roles asignados correctamente');
      } catch (error) {
        console.error('Error asignando roles:', error);
        alert('Error asignando roles');
      }
    };

    fetchRoles();

    return {
      searchQuery,
      usuarioEncontrado,
      userNotFound,
      roles,
      selectedRoles,
      buscarUsuario,
      assignRoles,
    };
  },
});
</script>

  
<style scoped>
.assign-roles-container {
  width: 700px;
  height: 600px;
  margin: 5px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.titulo{
  font-weight: 900;
  margin-bottom: 20px;
}

h3{
  font-weight: 600;
}

.search-box {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
    
}

.label1{
  color: cadetblue;
  font-weight: 600;
  margin-top: 5px;
}

.input-buscar{
  margin-left: 5px;
  padding-left: 10px;
  width: 250px;
  height: 33px;
  border-width: 2px;
  border-color: aliceblue;
}

.role-assignment {
  margin-top: 20px;
}

.user-info, .role-list {
  margin-bottom: 20px;
}

.roles-list{
  height: 320px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.role-list ul {
  list-style-type: none;
  padding: 0;
}

.role-list li {
  margin-bottom: 10px;
}

.no-user {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}

.btn {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>

  