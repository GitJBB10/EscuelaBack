<template>
  <div class="container">
    <div class="container-bar">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por nombres o apellidos..."
          class="search-bar"
        />
      </div>
      <h1>Listado de Estudiantes</h1>
    <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Género</th>
            <th>F. Nacimiento</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
      <tbody>
        <tr v-for="estudiante in filteredEstudiantes" :key="estudiante.id">
          <td>{{ estudiante.id }}</td>
          <td>{{ estudiante.nombres }}</td>
          <td>{{ estudiante.apellidos }}</td>
          <td>{{ estudiante.genero }}</td>
          <td>{{ estudiante.f_nacimiento }}</td>
          <td>{{ estudiante.mail }}</td>
          <!-- Acciones -->
          <td class="acciones">           
            <button @click="verEstudiante(estudiante.id)"> Ver - </button>
            <button @click="editarEstudiante(estudiante.id)"> Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar representante -->
    <EditarEstudianteModal
      v-if="showModal && selectedEstudiante"
      :showModal="showModal"
      :estudiante="selectedEstudiante!"
      @close="closeModal"
      @update="fetchEstudiantes"
    />

    <!-- Modal para ver estudiante -->
    <VerEstudianteModal
      v-if="showModalVer"
      :showModal="showModalVer"
      :estudiante="selectedEstudiante!"
      @close="closeModalVer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from '../../../../plugins/axios';
import EditarEstudianteModal from '@/modules/landing/pages/Estudiantes/EditarEstudianteModal.vue';
import VerEstudianteModal from '@/modules/landing/pages/Estudiantes/VerEstudianteModal.vue';

interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  mail: string;
  genero: string | null;
  f_nacimiento: string;
  representante:string;
  direccion: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: 'Estudiantes',
  components: {
    EditarEstudianteModal,
    VerEstudianteModal,
  },
  setup() {
    const estudiantes = ref<Estudiante[]>([]);
    const searchTerm = ref('');
    const showModal = ref(false);
    const showModalVer = ref(false);
    const selectedEstudiante = ref<Estudiante | null>(null);

    // Función para cargar los estudiantes desde la API
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get('/estudiante');
        estudiantes.value = response.data.data;
      } catch (error) {
        console.error('Error fetching estudiantes:', error);
      }
    };

    // Función para cerrar el modal de edición
    const closeModal = () => {
      showModal.value = false;
      selectedEstudiante.value = null;
    };

    // Función para abrir el modal de edición
    const editarEstudiante = (id: number) => {
      // Encontrar el representante en el array de representantes
      const estudiante = estudiantes.value.find((r) => r.id === id);

      if (estudiante) {
        // Clonar el representante para evitar mutar el original
        selectedEstudiante.value = { ...estudiante };
        showModal.value = true; // Mostrar el modal de edición
      }
    };

    // Función para abrir el modal de visualización
    const verEstudiante = (id: number) => {
      // Encontrar el representante en el array de representantes
      const estudiante = estudiantes.value.find((r) => r.id === id);

      if (estudiante) {
        // Clonar el representante para evitar mutar el original
        selectedEstudiante.value = { ...estudiante };
        showModalVer.value = true; // Mostrar el modal de visualización
      }
    };

    // Función para cerrar el modal de visualización
    const closeModalVer = () => {
      showModalVer.value = false;
      selectedEstudiante.value = null;
    };

    // Filtrar los representantes según el término de búsqueda
    const filteredEstudiantes = computed(() => {
      return estudiantes.value.filter((estudiante) => {
        return (
          estudiante.nombres.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          estudiante.apellidos.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });
    });

    // Cargar los representantes al montar el componente
    onMounted(() => {
      fetchEstudiantes();
    });

    return {
      estudiantes,
      searchTerm,
      filteredEstudiantes,
      editarEstudiante,
      verEstudiante,
      showModal,
      showModalVer,
      selectedEstudiante,
      closeModal,
      closeModalVer,
      fetchEstudiantes,
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
