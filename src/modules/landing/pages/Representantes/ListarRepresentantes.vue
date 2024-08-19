<template>
  <div class="container">
    <div class="container-bar">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por nombres, apellidos o identificación..."
          class="search-bar"
        />
      </div>
      <h1>Listado de Representantes</h1>
    <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Identificación</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Género</th>
            <th>Parentesco</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
      <tbody>
        <tr v-for="representante in filteredRepresentantes" :key="representante.id">
          <!-- Datos del representante -->
          <td>{{ representante.id }}</td>
          <td>{{ representante.identificacion }}</td>
          <td>{{ representante.nombres }}</td>
          <td>{{ representante.apellidos }}</td>
          <td>{{ representante.mail }}</td>
          <td>{{ representante.genero }}</td>
          <td>{{ representante.parentesco }}</td>
          <td>{{ representante.direccion }}</td>
          <td>{{ representante.telefono }}</td>
          <!-- Acciones -->
          <td class="acciones">           
            <button @click="verRepresentante(representante.id)"> Ver - </button>
            <button @click="editarRepresentante(representante.id)"> Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar representante -->
    <EditarRepresentanteModal
      v-if="showModal && selectedRepresentante"
      :showModal="showModal"
      :representante="selectedRepresentante!"
      @close="closeModal"
      @update="fetchRepresentantes"
    />

    <!-- Modal para ver representante -->
    <VerRepresentanteModal
      v-if="showModalVer"
      :showModal="showModalVer"
      :representante="selectedRepresentante!"
      @close="closeModalVer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from '../../../../plugins/axios';
import EditarRepresentanteModal from '@/modules/landing/pages/Representantes/EditarRepresentantesModal.vue';
import VerRepresentanteModal from '@/modules/landing/pages/Representantes/VerRepresentantesModal.vue';

interface Representante {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  mail: string;
  genero: string | null;
  f_nacimiento: string;
  parentesco: string;
  direccion: string;
  telefono: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: 'Representantes',
  components: {
    EditarRepresentanteModal,
    VerRepresentanteModal,
  },
  setup() {
    const representantes = ref<Representante[]>([]);
    const searchTerm = ref('');
    const showModal = ref(false);
    const showModalVer = ref(false);
    const selectedRepresentante = ref<Representante | null>(null);

    // Función para cargar los representantes desde la API
    const fetchRepresentantes = async () => {
      try {
        const response = await axios.get('/representante');
        representantes.value = response.data.data;
      } catch (error) {
        console.error('Error fetching representantes:', error);
      }
    };

    // Función para cerrar el modal de edición
    const closeModal = () => {
      showModal.value = false;
      selectedRepresentante.value = null;
    };

    // Función para abrir el modal de edición
    const editarRepresentante = (id: number) => {
      // Encontrar el representante en el array de representantes
      const representante = representantes.value.find((r) => r.id === id);

      if (representante) {
        // Clonar el representante para evitar mutar el original
        selectedRepresentante.value = { ...representante };
        showModal.value = true; // Mostrar el modal de edición
      }
    };

    // Función para abrir el modal de visualización
    const verRepresentante = (id: number) => {
      // Encontrar el representante en el array de representantes
      const representante = representantes.value.find((r) => r.id === id);

      if (representante) {
        // Clonar el representante para evitar mutar el original
        selectedRepresentante.value = { ...representante };
        showModalVer.value = true; // Mostrar el modal de visualización
      }
    };

    // Función para cerrar el modal de visualización
    const closeModalVer = () => {
      showModalVer.value = false;
      selectedRepresentante.value = null;
    };

    // Filtrar los representantes según el término de búsqueda
    const filteredRepresentantes = computed(() => {
      return representantes.value.filter((representante) => {
        return (
          representante.nombres.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          representante.apellidos.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          representante.identificacion.includes(searchTerm.value)
        );
      });
    });

    // Cargar los representantes al montar el componente
    onMounted(() => {
      fetchRepresentantes();
    });

    return {
      representantes,
      searchTerm,
      filteredRepresentantes,
      editarRepresentante,
      verRepresentante,
      showModal,
      showModalVer,
      selectedRepresentante,
      closeModal,
      closeModalVer,
      fetchRepresentantes,
    };
  },
});
</script>

<style scoped>
.container {
  width: 1100px;
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
