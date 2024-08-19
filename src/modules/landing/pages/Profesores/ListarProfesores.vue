<template>
  <div class="container">
    <div class="container-bar">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por identificación, nombres o apellidos..."
          class="search-bar"
        />
      </div>
      <h1>Listado de Profesores</h1>
    <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Identificación</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Género</th>
            <th>F. Nacimiento</th>
            <th>teléfono</th>
            <th>mail</th>
            <th>Acciones</th>
          </tr>
        </thead>
      <tbody>
        <tr v-for="profesor in filteredProfesores" :key="profesor.id">
          <td>{{ profesor.id }}</td>
          <td>{{ profesor.identificacion }}</td>
          <td>{{ profesor.nombres }}</td>
          <td>{{ profesor.apellidos }}</td>
          <td>{{ profesor.genero }}</td>
          <td>{{ profesor.f_nacimiento }}</td>
          <td>{{ profesor.telefono }}</td>
          <td>{{ profesor.mail }}</td>
          <!-- Acciones -->
          <td class="acciones">           
            <button @click="editarProfesor(profesor.id)"> Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar Profesor-->
    <EditarProfesorModal
      v-if="showModal && selectedProfesor"
      :showModal="showModal"
      :profesor="selectedProfesor!"
      @close="closeModal"
      @update="fetchProfesores"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from '../../../../plugins/axios';
import EditarProfesorModal from '@/modules/landing/pages/Profesores/EditarProfesorModal.vue';

interface Profesor {
  id: number;
  identificacion:string;
  nombres: string;
  apellidos: string;
  telefono:string;
  mail: string;
  estado_civil:string;
  genero: string | null;
  f_nacimiento: string;
  representante:string;
  direccion: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: 'Profesores',
  components: {
    EditarProfesorModal,
  },
  setup() {
    const profesores = ref<Profesor[]>([]);
    const searchTerm = ref('');
    const showModal = ref(false);
    const selectedProfesor = ref<Profesor | null>(null);

    // Función para cargar los profesores desde la API
    const fetchProfesores = async () => {
      try {
        const response = await axios.get('/profesor');
        profesores.value = response.data.data;
      } catch (error) {
        console.error('Error fetching profesores:', error);
      }
    };

    // Función para cerrar el modal de edición
    const closeModal = () => {
      showModal.value = false;
      selectedProfesor.value = null;
    };

    // Función para abrir el modal de edición
    const editarProfesor = (id: number) => {
    // Encontrar el profesor en el array de profesores
    const profesor = profesores.value.find((r) => r.id === id);

      if (profesor) {
        // Clonar el profesor para evitar mutar el original
        selectedProfesor.value = { ...profesor };
        showModal.value = true; // Mostrar el modal de edición
      }
    };

    // Filtrar los representantes según el término de búsqueda
    const filteredProfesores = computed(() => {
      return profesores.value.filter((profesor) => {
        return (
          profesor.identificacion.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          profesor.nombres.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          profesor.apellidos.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });
    });

    // Cargar los representantes al montar el componente
    onMounted(() => {
      fetchProfesores();
    });

    return {
      profesores,
      searchTerm,
      filteredProfesores,
      editarProfesor,
      showModal,
      selectedProfesor,
      closeModal,
      fetchProfesores,
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
