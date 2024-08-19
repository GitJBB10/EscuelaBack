<template>
  <div class="container">
    <div class="container-bar">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por usuario o mail..."
          class="search-bar"
        />
      </div>
      <h1>Listado de Usuarios</h1>
    <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Created_at</th>
            <th>Updated_at</th>
            <th>Acciones</th>
          </tr>
        </thead>
      <tbody>
        <tr v-for="usuario in filteredUsuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.name }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.created_at }}</td>
          <td>{{ usuario.updated_at }}</td>
          <!-- Acciones -->
          <td class="acciones">           
            <button @click="verUsuario(usuario.id)"> Ver - </button>
            <button @click="editarUsuario(usuario.id)"> Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar usuario -->
    <EditarUsuarioModal
      v-if="showModal && selectedUsuario"
      :showModal="showModal"
      :usuario="selectedUsuario!"
      @close="closeModal"
      @update="fetchUsuarios"
    />

    <!-- Modal para ver usuario -->
    <VerUsuarioModal
      v-if="showModalVer"
      :showModal="showModalVer"
      :usuario="selectedUsuario!"
      @close="closeModalVer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from '../../../../plugins/axios';
import EditarUsuarioModal from '@/modules/landing/pages/Usuarios/EditarUsuarioModal.vue';
import VerUsuarioModal from '@/modules/landing/pages/Usuarios/VerUsuarioModal.vue';

interface Usuario {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: 'Usuarios',
  components: {
    EditarUsuarioModal,
    VerUsuarioModal,
  },
  setup() {
    const usuarios = ref<Usuario[]>([]);
    const searchTerm = ref('');
    const showModal = ref(false);
    const showModalVer = ref(false);
    const selectedUsuario = ref<Usuario | null>(null);

    // Función para cargar los representantes desde la API
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('/user');
        usuarios.value = response.data.data;
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    // Función para cerrar el modal de edición
    const closeModal = () => {
      showModal.value = false;
      selectedUsuario.value = null;
    };

    // Función para abrir el modal de edición
    const editarUsuario = (id: number) => {
      // Encontrar el representante en el array de representantes
      const usuario = usuarios.value.find((r) => r.id === id);

      if (usuario) {
        // Clonar el representante para evitar mutar el original
        selectedUsuario.value = { ...usuario };
        showModal.value = true; // Mostrar el modal de edición
      }
    };

    // Función para abrir el modal de visualización
    const verUsuario = (id: number) => {
      // Encontrar el representante en el array de representantes
      const usuario = usuarios.value.find((r) => r.id === id);

      if (usuario) {
        // Clonar el representante para evitar mutar el original
        selectedUsuario.value = { ...usuario };
        showModalVer.value = true; // Mostrar el modal de visualización
      }
    };

    // Función para cerrar el modal de visualización
    const closeModalVer = () => {
      showModalVer.value = false;
      selectedUsuario.value = null;
    };

    // Filtrar los representantes según el término de búsqueda
    const filteredUsuarios = computed(() => {
      return usuarios.value.filter((usuario) => {
        return (
          usuario.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });
    });

    // Cargar los representantes al montar el componente
    onMounted(() => {
      fetchUsuarios();
    });

    return {
      usuarios,
      searchTerm,
      filteredUsuarios,
      editarUsuario,
      verUsuario,
      showModal,
      showModalVer,
      selectedUsuario,
      closeModal,
      closeModalVer,
      fetchUsuarios,
    };
  },
});
</script>

<style scoped>
.container {
  width: 1000px;
  height: 600px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.acciones{
  color: darkmagenta;
}

h1 {
  color: cadetblue;
  font-weight: bold;
  font-size:medium;
}

.container-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}

.search-bar {
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 5px;
  text-align: left;
  font-size: small;
}

table th {
  background-color: #203b55;
  color: azure;
  font-weight:bold;
  font-size:small;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
  transition: background-color 0.3s ease;
}

.link {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}

.link:hover {
  color: #0056b3;
}
</style>
